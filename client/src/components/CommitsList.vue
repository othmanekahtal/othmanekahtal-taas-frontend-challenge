<script lang="ts" setup>
import Commit from "./Commit.vue";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";

import { onMounted, ref, watch, type Ref } from "vue";
import CommitsListSkeleton from "./Skeleton/CommitsListSkeleton.vue";
const store = useStore();
const { repo } = defineProps<{ repo: string }>();
const { default_branch } = await store.getRepo(repo);
const commits = ref<any>([]);
let hasNext = ref(true);
let page = ref(1);

let loading = ref(false);

const branch = ref(default_branch);
const allBranches = await store.getBranches(repo);
const fetchCommits = async (branch: Ref<string>, page: Ref<number>) => {
  const response = await store.getCommits(branch.value, page.value, repo);
  if (!Object.keys(response).length) {
    const router = useRouter();
    router.push({ name: "Login" });
  }
  hasNext.value = !!response.hasNext;
  commits.value = [...commits.value, ...response?.data];
  page.value += hasNext.value ? 1 : 0;
};
await fetchCommits(branch, page);
const loadCommits = async () => {
  if (!hasNext.value) {
    return;
  }
  loading.value = true;
  await fetchCommits(branch, page);
  loading.value = false;
};
watch(branch, async () => {
  loading.value = true;
  page.value = 1;
  commits.value = [];
  await fetchCommits(branch, page);
  loading.value = false;
});
onMounted(() => {
  window.onscroll = async () => {
    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;
    console.log(bottomOfWindow);
    if (bottomOfWindow) {
      await loadCommits();
    }
  };
});
</script>
<template>
  <div class="my-4 w-full">
    <div class="flex justify-between items-center mb-4">
      <select
        class="select rounded-md dark:bg-slate-600 bg-gray-100 text-gray-700 dark:text-gray-400"
        name="branches"
        v-model="branch"
      >
        <option
          v-for="branch in allBranches"
          :key="branch['commit']['sha']"
          :value="branch['name']"
        >
          {{ branch["name"] }}
        </option>
      </select>
    </div>
    <div class="flex flex-col gap-y-4">
      <Commit
        v-for="commit in commits"
        :key="commit['sha']"
        :sha="commit['sha']"
        :avatar="commit['committer']['avatar_url']"
        :name="commit['commit']['author']['name']"
        :date="commit['commit']['author']['date']"
        :message="commit['commit']['message']"
      />
    </div>
    <CommitsListSkeleton v-if="loading" />
    <button
      v-if="hasNext"
      class="inline-flex mt-6 mx-auto py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      :class="!hasNext ? 'cursor-not-allowed' : ''"
      @click="loadCommits"
    >
      {{ hasNext ? "load more" : "No more" }}
    </button>
  </div>
</template>
