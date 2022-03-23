<script lang="ts" setup>
import { useStore } from "@/stores/index";
import sprite from "@/assets/sprite.svg";
import { storeToRefs } from "pinia";
const props = defineProps<{ name: string }>();
const store = useStore();
const { mode } = storeToRefs(store);

const repo = await store.getRepo(props.name);
</script>
<template>
  <div
    class="flex flex-col p-6 bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full"
  >
    <h5
      class="flex justify-between gap-x-5 mb-2 text-center font-medium tracking-tight text-gray-900 dark:text-white"
    >
      <span>
        {{ props.name }}
      </span>
      <svg
        class="w-6 h-6"
        :class="mode === 'light' ? 'fill-black' : 'fill-white'"
      >
        <use
          :href="`${sprite}${
            !repo['private'] ?? false ? '#icon-public' : '#icon-private'
          }`"
        />
      </svg>
    </h5>
    <div class="mb-3 px-2 font-light text-gray-700 dark:text-gray-400">
      <div class="font-bold capitalize">description :</div>
      {{ repo["description"] ?? "No description" }}
      <div class="font-bold capitalize">language :</div>
      {{ repo["language"] }}
      <div class="flex justify-start gap-2 flex-wrap mt-3">
        <div
          class="p-1 dark:bg-slate-600 bg-gray-100 rounded px-2"
          v-for="topic in repo['topics']"
          :key="`${topic}-key`"
        >
          {{ topic }}
        </div>
      </div>
    </div>
    <div class="flex justify-between gap-2 px-2">
      <div
        class="flex gap-2 justify-between items-center pr-2 dark:bg-slate-600 bg-gray-100 p-1 rounded divide-x"
      >
        <svg
          class="w-5 h-5"
          :class="mode === 'light' ? 'fill-black' : 'fill-white'"
        >
          <use :href="`${sprite}#icon-star`" />
        </svg>
        <span class="font-bold pl-2 text-gray-900 dark:text-white">{{
          repo["stargazers_count"]
        }}</span>
      </div>
      <div
        class="flex gap-x-2 justify-between items-center pr-2 dark:bg-slate-600 bg-gray-100 p-1 rounded divide-x"
      >
        <svg
          class="w-6 h-6"
          :class="mode === 'light' ? 'fill-black' : 'fill-white'"
        >
          <use :href="`${sprite}#icon-fork`" />
        </svg>
        <span class="font-bold pl-2 text-gray-900 dark:text-white">{{
          repo["forks_count"]
        }}</span>
      </div>
    </div>
  </div>
</template>
