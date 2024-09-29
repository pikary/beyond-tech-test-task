<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {useRoute} from 'vue-router';
import {onMounted} from "vue";
import {usePeopleStore} from "@/stores/users";
import IconButton from "@/components/shared/IconButton.vue";
import Map from "@/components/shared/Map.vue";

const store = usePeopleStore();
const route = useRoute();
const id = route.params.id;  // Access the dynamic id from the URL

const action_btns = [
  {
    ariaLabel: 'call',
    action: () => {
      window.location.href = `tel:${store.currentUser?.phone}`
    },
    icon: 'fas fa-phone'
  },
  {
    ariaLabel: 'website',
    action: () => {
      window.open(store.currentUser?.website, '_blank');
    },
    icon: 'fas fa-globe'
  },
  {
    ariaLabel: 'copy link',
    action: () => {
      navigator.clipboard.writeText(window.location.href + '/profile/' + id).then((text) => {
        alert('link to profile copied')
      })
    },
    icon: 'fas fa-copy'
  }
]


onMounted(() => {
  const fetchprofile = async () => {
    if (!id) {
      //return
    } else {
      await store.getUser(parseInt(id.toString()))
    }
  }
  fetchprofile()
})
</script>

<template>
  <div class="flex justify-between py-4 space-x-10">
    <div class="flex flex-col items-center basis-1/4">
      <img
          width="200" height="200"
          class="rounded-full"
          src="https://i.pravatar.cc/150?img=12" alt="ava"
      >
      <div class="flex mt-3 space-x-3 w-full justify-center">
        <IconButton
            v-for="(btn,ind) of action_btns"
            :key="ind"
            :icon="btn.icon"
            :onclick="btn.action"
            :aria-label="btn.ariaLabel"
            type="button"
        ></IconButton>

      </div>
    </div>
    <div class="user-data flex flex-col space-y-3 basis-1/4">
      <h3 class="text-2xl font-bold text-primary ">User Information</h3>
      <div>
        <p class="uppercase font-semibold text-gray-400 ">name</p>
        <p class="text-lg leading-none font-bold text-primary underline"><strong>{{ store.currentUser?.name }}</strong></p>
      </div>
      <div class="flex justify-between">
        <div>
          <p class="uppercase font-semibold text-gray-400 ">email</p>
          <p class="text-lg leading-none"><strong>{{ store.currentUser?.email }}</strong></p>
        </div>
        <div>
          <p class="uppercase font-semibold text-gray-400 ">username</p>
          <p class="text-lg leading-none"><strong>{{ store.currentUser?.username }}</strong></p>
        </div>

      </div>

      <div>
        <p class="uppercase font-semibold text-gray-400">Phone</p>
        <a :href="`tel:${store.currentUser?.phone}`"
           class="text-lg leading-none text-primary"><strong>{{ store.currentUser?.phone }}</strong></a>
      </div>
      <address class="text-lg">
        <i class="fas fa-map-marker-alt inline"></i> <span
          class="cursor-pointer font-semibold underline text-primary inline">{{
          store.currentUser?.address.city
        }} </span>,&nbsp;<span class="font-semibold inline"> {{ store.currentUser?.address.street }}</span>
      </address>
      <Map :lat="store.currentUser?.address.geo.lat" :long="store.currentUser?.address.geo.lng"></Map>
    </div>

    <div class="company-info basis-1/2 justify-self-start">
      <div class="w-full">
        <h3 class="text-2xl font-bold text-primary ">Company Information</h3>
        <div class="mb-4">
          <p class="text-lg uppercase font-semibold text-gray-400 ">Company Name:</p>
          <p class="text-lg">{{ store.currentUser?.company.name }}</p>
        </div>

        <div class="mb-4">
          <p class="text-lg uppercase font-semibold  text-gray-400">Catch Phrase:</p>
          <p class="text-lg text-primary font-semibold">{{ store.currentUser?.company.catchPhrase }}</p>
        </div>

        <div class="mb-4">
          <p class="text-lg uppercase font-semibold  text-gray-400">Business:</p>
          <p class="text-lg">{{ store.currentUser?.company.bs }}</p>
        </div>
      </div>
      <img
          class="object-fill"
          src="https://static.cdn.epam.com/uploads/d5ff32f0a6d3752a4cd480b707bb0da2/EPM-E3S/images/cities/nur_sultan.jpg"
          alt="company-img"
      />
    </div>
  </div>
</template>

<style scoped>
.user-data {

}
</style>