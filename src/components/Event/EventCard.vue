<template>
  <BaseEvent>
    <p class="text-xl font-bold">{{ event.name }}</p>
    <p class="text-sm font-light line-clamp-4">
      {{ event.description }}
    </p>
    <div class="flex items-center justify-between">
      <div class="flex gap-5 text-xs">
        <p>Fecha: <span class="font-semibold">12/12/2021</span></p>
        <p>Hora: <span class="font-semibold">12:00</span></p>
        <p>T. Invitados: <span class="font-semibold">0</span></p>
      </div>
      <div>
        <!-- Button to see details of the event -->
        <EyeIcon class="size-6" />
      </div>
    </div>
  </BaseEvent>
</template>

<script setup lang="ts">
import BaseEvent from "@/components/Event/BaseEvent.vue";
import { EyeIcon } from "@heroicons/vue/24/outline";
import type { Event } from "@/interfaces/Event/event";

const props = defineProps<{ event: Event }>();
</script>
