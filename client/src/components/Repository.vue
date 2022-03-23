<script lang="ts" setup>
import { RouterLink } from "vue-router";

const { name, description } = defineProps<{
  name: string;
  description?: string;
  defaultBranch: string;
}>();
</script>
<template>
  <div
    class="flex flex-col p-6 bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <h5 class="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
      {{ name }}
    </h5>
    <p class="mb-3 font-light text-gray-700 dark:text-gray-400 break-all">
      {{ description ?? "No description" }}
    </p>
    <RouterLink
      :to="{ name: 'Repo', params: { repo: name } }"
      class="ml-auto inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      more info
      <svg
        class="ml-2 -mr-1 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </RouterLink>
  </div>
</template>
