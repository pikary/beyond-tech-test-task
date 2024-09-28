<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import Input from "@/components/Input.vue";

const isTyping = ref(false)
const searchQuery = ref(''); // Store the search query

onMounted(()=>{
  const input = document.getElementById('people_search') as HTMLInputElement
  if(input){
    input.focus()
  }
})

watch(searchQuery, (newQuery)=>{
  isTyping.value = true;

})

</script>

<template>
  <header class="bg-primary w-full p-4">
    <nav class="flex justify-between items-center">
      <div class="flex space-x-4">
        <!-- Add logo or brand name here -->
        <span class="text-white font-dancing text-3xl">BeyondTech</span>
      </div>
      <Input
          className="custom-class"
          labelText=""
          placeholder="Search..."
          type="text"
          v-model="searchQuery"
      />
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