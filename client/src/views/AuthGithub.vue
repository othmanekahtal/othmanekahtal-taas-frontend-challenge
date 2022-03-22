<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/index";
const router = useRouter();
const route = useRoute();
const store = useStore();
const { token: access_token } = route.query;
if (!access_token) router.push("/");
store.authenticate(access_token as string);
router.push({ name: "Dashboard" });
</script>
<template></template>
