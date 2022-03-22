<script lang="ts" setup>
import Profile from "@/components/Profile.vue";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton.vue";
</script>
<template>
  <Suspense>
    <template #fallback>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <ProfileSkeleton />
      </div>
    </template>
    <template #default>
      <div
        class="py-32 max-w-md xs:max-w-md xs:px-4 sm:max-w-md sm:px-10 md:max-w-lg"
      >
        <Profile />
      </div>
    </template>
  </Suspense>
</template>
