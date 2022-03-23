<script lang="ts" setup></script>
<template>
  <div
    class="flex flex-col p-6 bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="space-y-3 my-3">
      <div
        class="h-2 bg-slate-700 rounded animate-pulse"
        v-for="item in 2"
        :key="`commit-${item}-line`"
      ></div>
    </div>
    <div class="text-center mr-auto animate-pulse w-52">
      <div class="bg-slate-700 rounded h-6"></div>
    </div>
  </div>
</template>
