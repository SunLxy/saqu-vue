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
          <img class='sr-code-copy-icon' src='./assets/copy.svg' />
        </div>
      </div>
      <div v-show='visible' class='sr-code-preview-code-html'>
        <div>
          <slot name='code' />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const props = withDefaults(
  defineProps<{
    code: string,
    lang: string,
  }>(),
  {}
)
console.log("CodePreview====props", props)

const visible = ref(false)

const onVisible = () => {
  visible.value = !visible.value
}

const onCopy = () => {
  // console.log("props", decodeURIComponent(props.code))
  try {
    navigator.clipboard.writeText(decodeURIComponent(props.code))
  } catch (err) {
    console.log(err)
  }
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
  width: 16px;
  height: 16px;
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

.sr-code-preview-code-html::before {
  border-top: 1px dashed rgba(5, 5, 5, 0.06);
  content: '';
  position: absolute;
  right: 0;
  left: 0;
}

pre {
  margin: 0;
  padding: 14px;
  box-sizing: border-box;
}

.sr-code-preview-body {
  padding: 42px 24px 50px;
  color: rgba(0, 0, 0, 0.88);
}
</style>
