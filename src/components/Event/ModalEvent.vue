<template>
    <Dialog
      :visible="props.visible"
      @update:visible="handleVisibilityChange"
      modal
      header="Invitados Agregados"
      :style="{ width: '600px' }"
      class="[&_.p-dialog-header]:bg-Dark [&_.p-dialog-content]:bg-Dark [&_.p-dialog-footer]:bg-Dark [&_.p-dialog-title]:text-white"
    >
      <div class="space-y-6">
        <div v-if="acceptedGuests.length > 0">
          <h3 class="text-lg font-semibold text-primary mb-3">Aceptados ({{ acceptedGuests.length }})</h3>
          <div class="space-y-4">
            <div
              v-for="(guest, index) in acceptedGuests"
              :key="'accepted-' + index"
              class="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p class="font-medium text-white">{{ guest.name }}</p>
                <p class="text-gray-400 text-sm">{{ guest.email }}</p>
              </div>
              <Button
                @click="deleteGuest(guest)"
                severity="danger"
                icon="pi pi-trash"
                class="p-button-rounded p-button-text"
              />
            </div>
          </div>
        </div>
  
        <div v-if="canceledGuests.length > 0">
          <h3 class="text-lg font-semibold text-danger mb-3">Cancelados ({{ canceledGuests.length }})</h3>
          <div class="space-y-4">
            <div
              v-for="(guest, index) in canceledGuests"
              :key="'canceled-' + index"
              class="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p class="font-medium text-white">{{ guest.name }}</p>
                <p class="text-gray-400 text-sm">{{ guest.email }}</p>
              </div>
              <div class="flex gap-2">
                <Button
                  @click="toggleStatus(guest, RegistrationStatus.Accepted)"
                  label="Reactivar"
                  class="p-button-success p-button-text"
                />
                <Button
                  @click="deleteGuest(guest)"
                  severity="danger"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text"
                />
              </div>
            </div>
          </div>
        </div>
  
        <div v-if="!acceptedGuests.length && !canceledGuests.length" class="text-center text-gray-400">
          No hay invitados registrados
        </div>
      </div>
  
      <template #footer>
        <Button
          label="Cerrar"
          @click="handleVisibilityChange(false)"
          class="p-button-text"
        />
      </template>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import axios from 'axios';
  import { useToast } from 'primevue/usetoast';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import { computed } from 'vue';
  
  const toast = useToast();
  
  interface Guest {
    id: number;
    name: string;
    email: string;
    status: RegistrationStatus;
    idInvitation?: number;
  }
  
  enum RegistrationStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Cancelled = 'Cancelled'
  }
  
  const props = defineProps<{
  visible: boolean;
  guests: Guest[];
  eventId: number;
}>();
  
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'guest-updated'): void;
}>();

const handleVisibilityChange = (value: boolean) => {
  emit('update:visible', value);
};

const acceptedGuests = computed(() => 
  props.guests.filter(g => g.status === RegistrationStatus.Accepted)
);
const canceledGuests = computed(() => 
  props.guests.filter(g => g.status === RegistrationStatus.Cancelled)
);
  
  // Actualizar estado del invitado
  const toggleStatus = async (guest: Guest, status: RegistrationStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/Invitation/UpdateStatus/${guest.idInvitation}`,
        { status }
      );
      
      guest.status = status;
      toast.add({
        severity: 'success',
        summary: 'Estado Actualizado',
        detail: `Estado cambiado a ${status}`,
        life: 2000
      });
      emit('guest-updated');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo actualizar el estado',
        life: 2000
      });
    }
  };
  
// Eliminar Invitado
const deleteGuest = async (guest: Guest) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/Invitation/Delete/${guest.idInvitation}`
    );
    const index = props.guests.findIndex(g => g.id === guest.id);
    if (index !== -1) {
      props.guests.splice(index, 1);
    }
    
    toast.add({
      severity: 'success',
      summary: 'Invitado eliminado',
      detail: `${guest.name} fue removido del evento`,
      life: 3000
    });
    
    emit('guest-updated');
  } catch (error) {
    handleError(error, 'eliminar invitado');
  }
};

const handleError = (error: any, action: string) => {
  console.error(`Error al ${action}:`, error);
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: `No se pudo ${action}`,
    life: 3000
  });
};
  </script>