<script lang="ts" setup>
import Repository from "@/components/Repository.vue";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
import { onMounted, ref, watch } from "vue";
import type { Repo } from "@/interfaces/repo";
import RepositorySkeleton from "@/components/Skeleton/RepositorySkeleton.vue";
import SpinnerLoading from "@/components/SpinnerLoading.vue";
const store = useStore();
let page = ref(1);
const repos = ref<Repo[] | []>([]);
const filteredRepos = ref<Repo[] | []>([]);
let totalResult = ref(0);
let hasNext = ref(true);
let loading = ref(false);
let valueInputSearch = ref("");

const fetchingRepos = async () => {
  loading.value = true;
  const response = await store.getRepos(page.value);
  if (!Object.keys(response).length) {
    const router = useRouter();
    router.push({ name: "Login" });
  }
  if (response.data?.length) {
    hasNext.value = !!response.hasNext;
    repos.value = [...(repos.value as Repo[] | []), ...response?.data];
  }
  page.value += hasNext.value ? 1 : 0;
  loading.value = false;
};
// get repositories :
await fetchingRepos();
// load more repositories :
const nextRepos = async () => {
  if (!hasNext.value) return;
  await fetchingRepos();
};
// reset searching here :
const resetSearching = () => {
  valueInputSearch.value = "";
  filteredRepos.value = [];
  totalResult.value = 0;
  loading.value = false;
};
// search functionality :
watch(valueInputSearch, async () => {
  filteredRepos.value = [];
  totalResult.value = 0;
  loading.value = true;
  const response = await store.searchRepo(valueInputSearch.value);
  loading.value = false;
  if (!Object.keys(response).length) {
    return;
  }
  filteredRepos.value = response.repos;
  totalResult.value = response.total;
  console.log(totalResult.value);
});
// infinite scroll functionality :
onMounted(() => {
  window.onscroll = async () => {
    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;
    console.log(bottomOfWindow);
    if (bottomOfWindow) {
      await nextRepos();
    }
  };
});
</script>
<!-- /go up -->
<template>
  <div class="relative">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative">
      <div
        class="absolute text-gray-900 dark:text-white right-3 top-1/2 -translate-y-1/2 font-small"
        v-if="!!valueInputSearch"
      >
        result: {{ totalResult }}
      </div>
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <!-- @blur="resetSearching" -->
      <input
        @keyup.esc="resetSearching"
        autocomplete="off"
        v-model.lazy="valueInputSearch"
        type="text"
        id="table-search"
        class="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        :class="valueInputSearch ? 'rounded-b-none' : ''"
        placeholder="Search for repository"
      />
    </div>

    <ul
      v-if="!!valueInputSearch"
      class="absolute rounded-t-none max-h-60 overflow-y-auto space-y-2 text-gray-900 text-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div v-if="loading" class="flex justify-center items-center my-10">
        <SpinnerLoading />
      </div>
      <li
        class="block py-3 pl-4 dark:hover:bg-slate-600 hover:bg-gray-100 transition"
        v-for="repo in filteredRepos"
      >
        <RouterLink
          :to="{ name: 'Repo', params: { repo: repo.name } }"
          class="block"
        >
          {{ repo?.name }}
        </RouterLink>
      </li>
      <div
        v-if="!loading && filteredRepos.length == 0"
        class="py-3 text-center"
      >
        Not found !
      </div>
    </ul>
  </div>
  <div class="flex flex-col mt-3">
    <div class="space-y-3">
      <Repository
        v-for="repository in repos"
        :key="repository.id"
        :name="repository.name"
        :description="repository.description"
        :defaultBranch="repository.default_branch"
      />
    </div>
    <div class="space-y-3 mt-3" v-if="loading">
      <RepositorySkeleton v-for="item in 5" :key="`skeletonLoading-${item}`" />
    </div>
    <!-- v-if="hasNext" -->
    <!-- <button
      class="inline-flex mt-6 mx-auto py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      :class="!hasNext ? 'cursor-not-allowed' : ''"
      @click="nextRepos"
    >
      {{ hasNext ? "load more" : "No more" }}
    </button> -->
  </div>
</template>
