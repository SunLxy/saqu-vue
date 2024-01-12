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
.sr-layout-head-theme {
  position: relative;
  z-index: 9999999;
  height: 54px;
  line-height: 54px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --sr-box-shadow: 0 1px 8px #454545;
}

.dark .sr-layout-head-theme {
  box-shadow: var(--sr-box-shadow) !important;
}
</style>
