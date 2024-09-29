<script setup lang="ts">
import UserSearch from "@/components/UserSearch.vue";

</script>

<template>
  <header class="bg-primary w-full p-4">
    <nav class="flex justify-between items-center">
      <div class="flex space-x-5 basis-1/2">
        <span class="text-white font-dancing text-3xl">BeyondTech</span>
        <UserSearch></UserSearch>
      </div>

<!--      <input id="people_search" class="px-2 py-1 rounded" type="text" placeholder="Search..." />-->
      <ul class="flex space-x-4">
        <li><a href="#" class="text-white">Home</a></li>
        <li><a href="#" class="text-white">About</a></li>
        <li><a href="#" class="text-white">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>

</style>