<script setup>
// import { AButton } from "@examples/components"
import "@examples/components/esm/index.css"
import MdContent from "./a.md"

const onTage = () => {
  document.body.classList.toggle('dark')
}

</script>

<template>
  <div>
    <button @click='onTage'>切换</button>
    <!-- <AButton>点击</AButton> -->
    <MdContent />
  </div>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
