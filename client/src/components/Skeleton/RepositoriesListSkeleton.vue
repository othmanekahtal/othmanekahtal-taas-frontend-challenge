<script lang="ts" setup>
import RepositorySkeleton from "@/components/Skeleton/RepositorySkeleton.vue";
</script>
<template>
  <div>
    <div class="relative mt-1">
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
      <input
        type="text"
        id="table-search"
        class="animate-pulse text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        placeholder="Loading ..."
      />
    </div>
  </div>
  <div class="flex flex-col mt-3">
    <div class="space-y-3">
      <RepositorySkeleton v-for="item in 5" :key="item" />
    </div>
    <div class="animate-pulse bg-slate-700 mt-6 rounded w-20 h-7 mx-auto"></div>
  </div>
</template>
