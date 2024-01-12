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
@import url("./../styles/layout/index.css");
</style>
