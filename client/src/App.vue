<script setup lang="ts">
import { RouterView } from "vue-router";
import ToggleMode from "./components/ToggleMode.vue";
import { useStore } from "@/stores/index";
import GoUp from "./components/GoUp.vue";
const store = useStore();
store.mode === "dark" && document.documentElement.classList.toggle("dark");
</script>

<template>
  <div>
    <ToggleMode />
    <Suspense>
      <RouterView />
    </Suspense>
    <GoUp />
  </div>
</template>
<style></style>
