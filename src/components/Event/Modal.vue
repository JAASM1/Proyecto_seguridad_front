<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-50"
  >
    <div class=" bg-Dark rounded-lg p-5 w-full max-w-lg">
      <header class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-red-500">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </header>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, default: "Modal" },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
