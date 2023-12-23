<template>
  <button class="ea-button" :class="buttonStyle">
    <slot />
  </button>
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  <img :width='100' src="./assets/logo.png" class="logo " alt="logo" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
defineOptions({ name: 'button' });
type ButtonProps = {
  type?: string;
  size?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [`button--${buttonProps.type}`]: buttonProps.type };
});
</script>
<style scoped>
@import url("./styles/index.css");

button {
  color: red;
}
</style>
