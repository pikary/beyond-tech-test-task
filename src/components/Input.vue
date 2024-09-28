<template>
  <div>
    <label v-if="labelText" :for="name" class="block text-gray-700 text-sm font-bold mb-2">
      {{ labelText }}
    </label>
    <input
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :class="['px-2 py-1 rounded focus:outline-1 focus:outline-gray focus:shadow-[0px_0px_10px_1px_gray] transition ease-in-out delay-150', className]"
        @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, InputHTMLAttributes } from 'vue';

interface InputProps {
  className?: string;
  labelText?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
}

const props = defineProps<InputProps>();
const { className, labelText, type, placeholder, value, name } = props;


</script>

<style scoped>
/* Tailwind styles are used, so no need for additional styles here */

input{
  outline: none;
  border: none !important;
}
</style>
