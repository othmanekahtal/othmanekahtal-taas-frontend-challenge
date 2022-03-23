<script lang="ts" setup>
import sprite from "@/assets/sprite.svg";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
const store = useStore();
const { mode } = storeToRefs(store);
const toTop = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
</script>
<template>
  <svg
    @click="toTop"
    class="fixed bottom-4 right-4 w-8 h-8 cursor-pointer p-2 rounded-full"
    :class="
      mode !== 'light'
        ? 'fill-black bg-white transition-colors hover:bg-gray-400'
        : 'fill-white bg-black transition-colors hover:bg-slate-800'
    "
  >
    <use :href="`${sprite}#icon-up`" />
  </svg>
</template>
