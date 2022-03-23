<script lang="ts" setup>
import CommitSkeleton from "./CommitSkeleton.vue";
</script>
<template>
  <div class="space-y-3 mt-3 w-full">
    <CommitSkeleton v-for="item in 5" :key="item" />
  </div>
</template>
