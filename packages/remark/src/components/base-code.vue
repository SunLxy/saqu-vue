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
.sr-adaptive-theme {
  position: relative;
  overflow-x: auto;
  padding: 14px;
  box-sizing: border-box;
  margin-top: 14px;
  border-radius: 3px;
}

pre {
  margin: 0;
  box-sizing: border-box;
}

.sr-code-preview-main+.sr-adaptive-theme,
.sr-code-preview-code-html>.sr-adaptive-theme {
  margin-top: 0px;
}

.sr-adaptive-theme>.lang {
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  color: rgba(60, 60, 67, .56);
  transition: opacity .4s;
  opacity: 1;
}

.sr-adaptive-theme>.copied,
.sr-adaptive-theme>.copy {
  direction: ltr;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  border: 1px solid #e2e2e3;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: #f6f6f7;
  opacity: 0;
  cursor: pointer;
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: border-color .25s, background-color .25s, opacity .25s;
}

.sr-adaptive-theme>.copy {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
}

.sr-adaptive-theme>.copied {
  opacity: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(1, 158, 11,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E")
}

.sr-adaptive-theme:hover>.copy {
  opacity: 1;
}

.sr-adaptive-theme>.copy:hover,
.sr-adaptive-theme>.copied:hover {
  background-color: #fff;
}

.sr-adaptive-theme:hover>.lang {
  opacity: 0;
}
</style>
