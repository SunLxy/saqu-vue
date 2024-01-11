<template>
  <div class='sr-layouts'>

    <Head />
    <div class='sr-layout-main-warp'>
      <div class='sr-layout-main'>
        <Sider />
        <Content>
          <slot />
        </Content>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Head from "./Head/base-head.vue";
import Sider from "./Sider/base-sider.vue"
import Content from "./Content/base-content.vue"

</script>
<style setup >
.sr-layouts {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 14px;
}

.sr-layout-main-warp {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.sr-layout-main {
  display: flex;
  flex-direction: row;
  width: 1200px;
}
</style>
