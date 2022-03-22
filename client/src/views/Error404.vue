<script lang="ts" setup>
import pageNotFound from "@/assets/page_not_found.svg";
import { RouterLink } from "vue-router";
</script>
<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center gap-y-5 overflow-hidden"
  >
    <img
      :src="pageNotFound"
      alt="page not found illustration"
      class="w-1/3 object-contain"
    />
    <a class="btn bg-blue-500 rounded-lg px-6 py-2 text-white cursor-pointer">
      <RouterLink to="/"> Go to home</RouterLink>
    </a>
  </div>
</template>
