<template>
  <div class='sr-layouts'>

    <Head :title='props.title' />
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
import { DocLayoutProps } from "./interface"
import Head from "./Head/base-head.vue";
import Sider from "./Sider/base-sider.vue"
import Content from "./Content/base-content.vue"
const props = withDefaults(defineProps<DocLayoutProps>(), {
  title: "Markdown 文档"
})
</script>
<style setup >
@import url("./../styles/layout/index.css");
</style>
