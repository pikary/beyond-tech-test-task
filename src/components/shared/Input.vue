<template>
  <label v-if="labelText" :for="name" class="block text-gray-700 text-sm font-bold mb-2">
    {{ labelText }}
  </label>
  <div class="relative flex w-full">
    <i v-if="icon" :class="[icon,'absolute left-1.5 translate-y-1/2 transition-colors duration-300', focus ? 'text-black' : 'text-gray-400']"></i>
    <input
        :id="name"
        :type="type"
        :placeholder="placeholder"
        v-bind:model-value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="['px-2 py-1 rounded border border-transparent focus:border-black focus:shadow-[0px_0px_10px_1px_gray] transition ease-in-out delay-330', className]"
        @focus="focus = true"
        @blur="focus = false"
        :aria-label="placeholder || labelText"
        autocomplete="off"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface InputProps {
  className?: string;
  labelText?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  modelValue:string;
  icon?:string
}

const props = defineProps<InputProps>();
const { className, labelText, type, placeholder, name,modelValue, icon } = props;
const focus = ref(false);

</script>

<style scoped>
input {
  outline: none;
  padding-left: 30px;
}
input::placeholder {
  padding-left: 20px;
}

i {
  top: 50%;
  transform: translateY(-50%);
}
</style>
