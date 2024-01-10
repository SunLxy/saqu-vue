<template>
  <div class='sr-adaptive-theme'>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const props = withDefaults(
  defineProps<{
    code: string
  }>(),
  {}
)
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
<style setup ></style>
