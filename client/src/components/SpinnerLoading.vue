<script lang="ts" setup>
import sprite from "./../assets/sprite.svg";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";
const store = useStore();
const { mode } = storeToRefs(store);
</script>
<template>
  <svg
    class="animate-spin w-8 h-8 cursor-pointer"
    :class="mode === 'light' ? 'fill-black' : 'fill-white'"
  >
    <use :href="`${sprite}#icon-spinner`"></use>
  </svg>
</template>
