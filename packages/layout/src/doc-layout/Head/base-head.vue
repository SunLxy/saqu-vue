<template>
  <div class='sr-layout-head-theme'>
    <div class='sr-layout-head-body'>
      <div>{{ props.title }}</div>
      <ThemeButton />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ThemeButton from './theme-button.vue';
import { HeadProps } from "./interface"
const props = withDefaults(defineProps<HeadProps>(), {
  title: "Markdown 文档"
})

</script>
<style setup >
@import url("../../styles/layout/head.css");
</style>
