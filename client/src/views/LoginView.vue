<script setup lang="ts">
const { VITE_GITHUB_CLIENT_ID: client_id } = import.meta.env;
</script>
<template>
  <div class="h-screen flex justify-center items-center">
    <a
      :href="`https://github.com/login/oauth/authorize?scope=user%20repo&client_id=${client_id}`"
      class="btn bg-blue-500 rounded-lg px-6 py-2 inline-flex gap-2 items-center text-white cursor-pointer"
    >
      <img
        src="https://docs.github.com/assets/cb-803/images/site/favicon.svg"
        alt="github icon"
      />
      <span> Authorize To my Github</span>
    </a>
  </div>
</template>
