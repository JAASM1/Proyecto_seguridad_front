<template>
  <BaseEvent>
    <div class="space-y-3">
      <p class="text-xl font-bold">{{ event.name }}</p>
      <p class="text-sm font-light line-clamp-4">
        {{ event.description }}
      </p>
    </div>
    <div class="flex items-center">
      <div class="flex-1 flex w-full gap-5 text-xs">
        <p>
          Fecha: <span class="font-semibold">{{ dateUTC }}</span>
        </p>
        <p>
          Hora: <span class="font-semibold">{{ timeUTC }}</span>
        </p>
      </div>
      <div class="flex gap-3">
        <!-- <button @click="$emit('edit', event)">Editar</button> -->
        <!-- Button to see details of the event -->
        <button @click="$emit('details')" class="cursor-pointer">
          <EyeIcon class="size-6" />
        </button>
      </div>
    </div>
  </BaseEvent>
</template>

<script setup lang="ts">
import BaseEvent from "@/components/Event/BaseEvent.vue";
import { EyeIcon, PencilIcon } from "@heroicons/vue/24/outline";
import type { Event } from "@/interfaces/Event/event";
import { computed } from "vue";

const props = defineProps<{ event: Event;}>();


const dateUTC = computed(() => {
  const date = new Date(props.event.eventDateTime!);
  return date.toLocaleDateString();
});
const timeUTC = computed(() => {
  const date = new Date(props.event.eventDateTime!);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
});
</script>
