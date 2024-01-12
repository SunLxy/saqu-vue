<template>
  <div class='sr-code-preview-main'>
    <div class='sr-code-preview-body'>
      <slot />
    </div>
    <div class='sr-code-preview-code'>
      <div class='sr-code-preview-code-buttons'>
        <div @click='onVisible' class='sr-code-box-code-action'>
          <img v-if='visible' class='sr-code-expand-icon-hide' src='./assets/expand.svg' />
          <img v-else class='sr-code-expand-icon-show' src='./assets/unexpand.svg' />
        </div>
        <div @click='onCopy' class='sr-code-box-code-action'>
          <span :class='copyClass'></span>
        </div>
      </div>
      <div ref='codeRlementRef' :style='codeStyle' :class='codeClass'>
        <slot name='code' />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue"
import { useCopy } from "./hooks/useCopy"

const props = withDefaults(
  defineProps<{
    code: string,
    lang: string,
  }>(),
  {}
)

const { onCopy, copyClass } = useCopy(props.code)

const visible = ref(false)

const codeRlementRef = ref()

const codeStyle = computed(() => {
  if (codeRlementRef.value && visible.value) {
    return { height: `${codeRlementRef.value.scrollHeight}px` }
  }
  return { height: 0 }
})

const codeClass = computed(() => {
  return {
    "sr-code-preview-code-html": true,
    "sr-code-show": !!codeStyle.value.height
  }
})

const onVisible = () => {
  visible.value = !visible.value
}

</script>
<style setup >
@import url('./styles/code-preview.css');
</style>
