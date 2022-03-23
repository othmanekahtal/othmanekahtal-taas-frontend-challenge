<script lang="ts" setup>
import { useRoute } from "vue-router";
import RepositorySkeleton from "../components/Skeleton/RepositorySkeleton.vue";
import RepositoryDetail from "../components/RepositoryDetail.vue";
import CommitsListSkeleton from "../components/Skeleton/CommitsListSkeleton.vue";
import CommitsList from "../components/CommitsList.vue";
const route = useRoute();
const { repo } = route.params;
</script>
<template>
  <Suspense>
    <template #fallback>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <RepositorySkeleton />
        <CommitsListSkeleton />
      </div>
    </template>
    <template #default>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <RepositoryDetail :name="(repo as string)" />
        <CommitsList :repo="(repo as string)" />
      </div>
    </template>
  </Suspense>
</template>
