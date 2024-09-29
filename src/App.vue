<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'


</script>

<template>
  <Navbar></Navbar>
  <main>
    <RouterView />
  </main>

</template>

<style scoped>

</style>
