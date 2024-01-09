<template>
  <div class='saqu-code-preview-main'>
    <div class='saqu-code-preview-body'>
      <slot />
    </div>
    <div class='saqu-code-preview-code'>
      <div class='saqu-code-preview-code-buttons'>
        <div>按钮部分</div>
      </div>
      <div class='saqu-code-preview-code-html'>
        <slot name='code' />
      </div>
      <button @click='copyCode'>点击</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    code: string
  }>(),
  {}
)

const copyCode = () => {
  console.log("props", decodeURIComponent(props.code))
  // try {
  //   navigator.clipboard.writeText(decodeURIComponent(props.code))
  // } catch (err) {
  //   console.log(err)
  // }
}
</script>
