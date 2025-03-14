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
        <p>T. Invitados: <span class="font-semibold">0</span></p>
      </div>
      <div class="flex gap-3">
        <!-- Button to see details of the event -->
        <EyeIcon class="size-6" />
        <!-- Button to edit the event -->
        <button @click="$emit('edit')" class="cursor-pointer">
          <PencilIcon class="size-6" />
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

const props = defineProps<{ event: Event }>();

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
