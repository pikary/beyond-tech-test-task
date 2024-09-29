<script setup lang="ts">
import {onMounted, ref, watch,onUnmounted} from "vue";
import {useRouter} from "vue-router";
import Input from "@/components/shared/Input.vue";
import {usePeopleStore} from "@/stores/users";


const router = useRouter()
const usersStore = usePeopleStore()
const isTyping = ref(false)
const searchQuery = ref('');

const selectProfile = (id:number) =>{
  router.push({name:'Profile',params:{id}})
}

onMounted(() => {
  const input = document.getElementById('people-search') as HTMLInputElement;

  if (input) {
    const handleBlur = () => {
      // Add a delay before hiding the results to allow user interaction
      setTimeout(() => {
        isTyping.value = false;
      }, 200); // Delay by 200ms
    };
    const handleFocus = () => {
      isTyping.value = true;
    };
    input.addEventListener('blur', handleBlur);
    input.addEventListener('focus', handleFocus);

    onUnmounted(() => {
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('focus', handleFocus);
    });
  }
});

let debounceTimeout: number;
watch(searchQuery, async (newQuery) => {

  if (debounceTimeout) clearTimeout(debounceTimeout);
  // Set a delay of 300ms before triggering the API call
  debounceTimeout = setTimeout(async () => {
    await usersStore.userSearch(newQuery);
  }, 300); // Adjust the debounce delay as needed
});
</script>

<template>
  <div class="relative flex-grow">
    <Input
        icon="fas fa-search "
        name="people-search"
        className="rounded-xl bg-white bg-opacity-[60]"
        labelText=""
        placeholder="Search..."
        type="text"
        v-model:modelValue="searchQuery"
        :model-value="searchQuery"
    />
    <transition name="fade-slide">
      <div v-if="isTyping"
           class="absolute py-2 border-2 border-gray rounded-xl w-full bg-white left-0 ease-in-out"
      >
        <h3 class=" px-4 text-lg font-semibold">Recent</h3>
        <hr/>
        <ul v-if="usersStore.users.length > 0">
          <li
              @click="selectProfile(user.id)"
              v-for="user in usersStore.users"
              :key="user.id"
              class="flex items-center space-x-3 py-3 px-4 cursor-pointer bg-transparent hover:bg-[rgba(0,0,0,0.1)] transition-colors duration-100 ease-in-out "
          >
            <i class="fas fa-search"></i>
            <p><strong>{{user.name}}</strong>&nbsp;&bull;&nbsp;{{user.company.name}}</p>
          </li>
        </ul>

        <ul v-else class="mt-3">
          <li class="flex items-center  space-x-3 py-3 px-4 cursor-pointer bg-transparent hover:bg-[rgba(0,0,0,0.1)] transition-colors duration-100 ease-in-out ">
            <i class="fas fa-clock"></i>
            <p><strong>Nurlan Baitassov</strong></p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>