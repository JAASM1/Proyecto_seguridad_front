<template>
  <div class="bg-cpnDark rounded-lg p-3 flex flex-col gap-2">
    <span>
      <h2 class="text-sm">{{ title }}</h2>
    </span>
    <span class="bg-white border-2 rounded-full border-white flex w-1/2"></span>
    <span>
      <p class="font-light text-justify">{{ body }}</p>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title: string;
  body: string;
}>();
</script>
