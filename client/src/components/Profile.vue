<script lang="ts" setup>
import { useStore } from "@/stores/index";

const store = useStore();
const user = await store.getUser();
</script>
<template>
  <div
    class="rounded-3xl w-full my-3 bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-400"
  >
    <div class="flex justify-center -mt-10">
      <img
        :src="user?.avatar_url"
        class="rounded-full border-solid border-white dark:border-slate-800 border-4 w-20 h-20"
      />
    </div>

    <div class="px-3 py-6">
      <h1 class="text-center text-2xl font-sans text-gray-900 dark:text-white">
        {{ user?.name }}
      </h1>
      <div
        class="flex justify-center items-center space-x-2 text-gray-900 dark:text-white"
      >
        <span class="text-font">email :</span>
        <span>{{ user?.email }}</span>
      </div>
      <p class="mt-6 font-sans font-light">
        {{ user?.bio }}
      </p>
    </div>
    <div class="flex justify-center pb-3 text-gray-900 dark:text-white">
      <div class="text-center mr-3 border-r pr-3">
        <h2>{{ user?.followers }}</h2>
        <span>Followers</span>
      </div>
      <div class="text-center">
        <h2>{{ user?.total_private_repos! + user?.public_repos! }}</h2>
        <span>Your repos.</span>
      </div>
    </div>
  </div>
</template>
