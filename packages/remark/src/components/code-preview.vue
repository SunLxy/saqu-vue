<template>
  <div class='sr-code-preview-main'>
    <div class='sr-code-preview-body'>
      <slot />
    </div>
    <div class='sr-code-preview-code'>
      <div class='sr-code-preview-code-buttons'>
        <div @click='onVisible' class='sr-code-box-code-action'>
          <img class='sr-code-expand-icon-hide' src='./assets/expand.svg' />
          <img class='sr-code-expand-icon-show' src='./assets/unexpand.svg' />
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
.sr-code-preview-main {
  position: relative;
  display: inline-block;
  margin: 0 0 16px;
  background-color: #ffffff;
  border: 1px solid rgba(5, 5, 5, 0.06);
  border-radius: 8px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  width: 100%;
}

.sr-code-preview-code {
  width: 100%;
}

.sr-code-preview-code-buttons {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  padding: 12px 0;
  border-top: 1px dashed rgba(5, 5, 5, 0.06);
  opacity: 0.7;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  column-gap: 16px;
  row-gap: 16px
}

.sr-code-box-code-action {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  -webkit-transition: all 0.24s;
  transition: all 0.24s;
}

.sr-code-expand-icon-hide,
.sr-code-expand-icon-show,
.sr-code-copy-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  margin: 0;
  box-shadow: none;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.sr-code-preview-code-html.sr-code-show::before {
  border-top: 1px dashed rgba(5, 5, 5, 0.06);
  content: '';
  position: absolute;
  right: 0;
  left: 0;
  z-index: 10;
}

.sr-code-preview-body {
  padding: 42px 24px 50px;
  color: rgba(0, 0, 0, 0.88);
}

.sr-code-preview-code-html {
  -webkit-transition: all 0.24s;
  transition: all 0.24s;
  overflow: hidden;
}

.sr-code-preview-code-html>.sr-adaptive-theme {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}

.sr-code-box-code-action>.copied,
.sr-code-box-code-action>.copy {
  direction: ltr;
  position: absolute;
  cursor: pointer;
  z-index: 3;
  border-radius: 4px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: border-color .25s, background-color .25s, opacity .25s;
}

.sr-code-box-code-action>.copy {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
}

.sr-code-box-code-action>.copied {
  opacity: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(1, 158, 11,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E")
}
</style>
