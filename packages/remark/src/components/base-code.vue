<template>
  <div :class='["sr-adaptive-theme", props.class]' :style='props.style'>
    <button :class='copyClass' @click='onCopy'></button>
    <span class='lang'>{{ props.lang }}</span>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { StyleValue } from "vue"
import { useCopy } from "./hooks/useCopy"
const props = withDefaults(
  defineProps<{
    code: string,
    lang: string,
    class: string,
    style: StyleValue
  }>(),
  {}
)
const { onCopy, copyClass, } = useCopy(props.code)
</script>
<style setup >
@import url("./styles/base-code.css");
</style>
