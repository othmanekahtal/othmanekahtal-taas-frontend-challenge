<script lang="ts" setup>
import sprite from "@/assets/sprite.svg";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
const store = useStore();
const { mode } = storeToRefs(store);
const toggle = () => {
  store.switchMode();
};
</script>
<template>
  <svg
    @click="toggle"
    class="fixed top-2 right-2 w-8 h-8 cursor-pointer"
    :class="mode === 'light' ? 'fill-black' : 'fill-white'"
  >
    <use :href="`${sprite}#icon-${mode == 'light' ? 'sun' : 'moon'}`"></use>
  </svg>
</template>
