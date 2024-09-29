<script setup lang="ts">
import {defineProps, onMounted, watch, ref} from 'vue'
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'

const props = defineProps<{ lat: number | undefined, long: number | undefined }>()
let map: L.Map | undefined = undefined
const zoom = 15

const initializeMap = (lat: number, long: number) => {
  if (!map) {
    // Initialize the map only if it hasn't been initialized yet
    map = L.map('map').setView([lat, long], zoom);
  } else {
    // Update the map view if it has already been initialized
    map.setView([lat, long], zoom);
  }

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([lat,long]).addTo(map)
};


onMounted(() => {
  if (props.lat !== undefined && props.long !== undefined) {
    // Initialize the map with the passed lat and long props
    initializeMap(+props.lat, +props.long)
  }
});
// Watch for changes in lat and long, and update the map view accordingly
watch(() => [props.lat, props.long], ([newLat, newLong]) => {
  console.log('change')
  console.log([+props.lat, +props.long])
  if (newLat !== undefined && newLong !== undefined) {
    initializeMap(+props.lat, +props.long)
  }
});
</script>

<template>
  <div style="height:200px; width:400px; flex-grow: 1" id="map"></div>
</template>

<style scoped>

</style>