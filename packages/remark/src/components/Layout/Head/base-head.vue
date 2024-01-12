<template>
  <div class='sr-layout-head-theme'>
    这是页面头部内容
    <button @click='onTage'>切换</button>
  </div>
</template>
<script lang="ts" setup>

const onTage = () => {
  document.body.classList.toggle('dark')
}
</script>
<style setup >
@import url("../../styles/layout/head.css");
</style>
