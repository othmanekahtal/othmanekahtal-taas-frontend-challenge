<script lang="ts" setup>
import Profile from "@/components/Profile.vue";
import RepositoriesList from "@/components/RepositoriesList.vue";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton.vue";
import RepositoriesListSkeleton from "@/components/Skeleton/RepositoriesListSkeleton.vue";
</script>
<template>
  <Suspense>
    <template #fallback>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <ProfileSkeleton />
        <RepositoriesListSkeleton />
      </div>
    </template>
    <template #default>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <Profile />
        <RepositoriesList />
      </div>
    </template>
  </Suspense>
</template>
