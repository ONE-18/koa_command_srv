<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style scoped>
/* Ensure the content uses the full width of the window */
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
