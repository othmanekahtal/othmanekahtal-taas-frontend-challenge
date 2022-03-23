<script lang="ts" setup>
import moment from "moment";

const { message, name, avatar, date, sha } = defineProps<{
  message: string;
  name: string;
  date: string;
  sha: string;
  avatar: string;
}>();
const copySHA = () => {
  console.log(sha);
};
</script>
<template>
  <div
    class="p-6 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700 border border-gray-200 shadow-md"
  >
    <div class="text-black dark:text-white pb-2 truncate" :title="message">
      {{ message }}
    </div>
    <div
      class="text-black w-content dark:text-white font-light inline-block bg-gray-100 text-xs dark:bg-slate-600 rounded-3xl px-2 mb-2 cursor-pointer"
      @click="copySHA"
    >
      {{ sha.slice(0, 8) }}
    </div>
    <div class="flex items-center gap-x-2">
      <img class="w-8 h-8 rounded-full" :src="avatar" alt="profile_image" />
      <div class="flex flex-col">
        <span class="text-black dark:text-white text-sm">{{ name }} </span>
        <span class="text-black dark:text-white font-light text-xs"
          >committed at : {{ moment(date).fromNow() }}</span
        >
      </div>
    </div>
  </div>
</template>
