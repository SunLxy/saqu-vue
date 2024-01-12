<template>
  <div class='sr-layout-main-sider-theme'>
    侧边左边菜单
  </div>
</template>
<script lang="ts" setup>

</script>
<style setup >
.sr-layout-main-sider-theme {
  overflow: auto;
  border-right: 1px solid #eee;
  --sr-border-color: #2e2e32;
  width: 228px;
  padding: 14px;
  box-sizing: border-box;
}

.dark .sr-layout-main-sider-theme {
  border-right-color: var(--sr-border-color) !important;
}
</style>
