<template>
  <div :class='["sr-adaptive-theme", props.class]' :style='props.style'>
    <button :class='copyClass' @click='onCopy'></button>
    <span class='lang'>{{ props.lang }}</span>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { useCopy } from "./hooks/useCopy"
import { StyleValue } from "vue"
export interface BaseCodeProps {
  code: string,
  lang: string,
  class: string,
  style: StyleValue
}

const props = withDefaults(defineProps<BaseCodeProps>(), {})
const { onCopy, copyClass, } = useCopy(props.code)
</script>
<style setup >
@import url("./styles/base-code.css");
</style>
