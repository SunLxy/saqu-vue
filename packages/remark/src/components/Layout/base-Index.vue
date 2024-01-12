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
const props = withDefaults(defineProps<{ subMenus: Array<Object> }>(), {})
import Head from "./Head/base-head.vue";
import Sider from "./Sider/base-sider.vue"
import Content from "./Content/base-content.vue"

</script>
<style setup >
.dark {
  --sr-layouts-bg: #1b1b1f;
  --sr-layouts-color: #e1e4e8;
  background-color: var(--sr-layouts-bg);
  color: var(--sr-layouts-color);
}

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
