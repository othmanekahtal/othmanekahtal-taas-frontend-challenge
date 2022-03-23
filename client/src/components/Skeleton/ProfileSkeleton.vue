<script lang="ts" setup></script>
<template>
  <div
    class="flex flex-col p-6 bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-3"
  >
    <div class="animate-pulse space-x-4 justify-center">
      <div class="rounded-full bg-slate-700 h-20 w-20 m-auto -mt-14"></div>
      <div class="space-y-3 my-3 animate-pulse">
        <div
          class="h-2 bg-slate-700 rounded animate-pulse"
          v-for="item in 4"
          :key="`profileSkeleton-${item}-line`"
        ></div>
      </div>
      <div class="flex justify-center">
        <div class="text-center mr-3 border-r pr-3">
          <div class="bg-slate-700 rounded w-20 h-7"></div>
        </div>
        <div class="text-center mr-3">
          <div class="bg-slate-700 rounded w-20 h-7"></div>
        </div>
      </div>
    </div>
  </div>
</template>
