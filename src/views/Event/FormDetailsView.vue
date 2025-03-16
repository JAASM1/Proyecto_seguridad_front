<template>
    <div class="text-white space-y-5 font-poppins flex flex-col items-center">
      <Toast />
      <div class="space-y-3 w-full max-w-lg">
        <h2 class="text-2xl font-bold">Nombre del evento</h2>
        <Form
          @submit="submitForm"
          :validation-schema="formEventValidation"
          class="w-full max-w-lg mx-auto flex flex-col space-y-3"
          v-slot="{ resetForm }"
        >
          <!-- Descripción -->
          <div>
            <FloatLabel variant="in">
              <Field name="description" v-slot="{ field }">
                <Textarea
                  id="description"
                  rows="5"
                  cols="30"
                  style="resize: none"
                  v-bind="field"
                  class="bg-inputColor w-full"
                />
              </Field>
              <label for="description">Descripción</label>
            </FloatLabel>
            <ErrorMessage name="description" class="text-danger text-sm" />
          </div>
  
          <!-- Fecha y Hora -->
          <div class="flex w-full space-x-3">
            <div class="w-full">
              <FloatLabel variant="in" class="w-full">
                <Field name="eventDateTime" v-slot="{ field }">
                  <DatePicker
                    id="eventDateTime"
                    showTime
                    hourFormat="24"
                    fluid
                    v-bind="field"
                    class="custom-datepicker"
                  />
                </Field>
                <label for="eventDateTime">Fecha y hora</label>
              </FloatLabel>
              <ErrorMessage name="date" class="text-danger text-sm" />
            </div>
          </div>
  
          <!-- Ubicación -->
          <div>
            <FloatLabel variant="in">
              <Field name="location" v-slot="{ field }">
                <InputText
                  id="location"
                  v-bind="field"
                  variant="filled"
                  class="w-full bg-inputColor"
                />
              </Field>
              <label for="location">Ubicación</label>
            </FloatLabel>
            <ErrorMessage name="location" class="text-danger text-sm" />
          </div>
  
          <!-- Compartir enlace -->
          <div>
            <FloatLabel variant="in">
              <Field name="shareLink" v-slot="{ field }">
                <InputText
                  id="shareLink"
                  v-bind="field"
                  variant="filled"
                  class="w-full bg-inputColor"
                />
                <button
                  @click="copyToClipboard"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                  </svg>
                </button>
              </Field>
              <label for="shareLink">Comparte e invita por medio del enlace</label>
            </FloatLabel>
            <ErrorMessage name="shareLink" class="text-danger text-sm" />
          </div>
  
          <!-- Lista de invitados -->
          <div class="mt-5 flex justify-between items-center">
            <button
              type="button"
              @click="showGuestListModal = true"
              class="font-bold bg-primary text-white rounded-lg py-3 px-5 cursor-pointer flex items-center"
            >
              Lista de invitados
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ml-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </button>
  
            <div class="flex space-x-2">
              <button class="p-2 hover:bg-gray-700 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
  
              <button class="p-2 hover:bg-gray-700 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </Form>
      </div>
  
      <!-- Modal de invitados -->
      <Dialog 
    v-model:visible="showGuestListModal" 
    modal 
    header="Invitados Agregados"
    :style="{ width: '500px' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      class="[&_.p-dialog-header]:bg-Dark [&_.p-dialog-content]:bg-Dark [&_.p-dialog-footer]:bg-Dark [&_.p-dialog-title]:text-white [&_.p-dialog-header-icon]:text-white"
    >
    <div class="space-y-4">
      <div v-for="(guest, index) in guests" :key="index" class="border-b pb-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-semibold text-white">{{ guest.name }}</p>
            <p class="text-white text-sm opacity-40">{{ guest.email }}</p>
          </div>
          
          <div class="flex gap-2 items-center">
            <Button 
              @click="toggleStatus(guest, RegistrationStatus.Accepted)"
              :severity="guest.status === RegistrationStatus.Accepted ? 'success' : 'secondary'"
              text
              rounded
              :label="'Aceptada'"
            />
            <Button 
              @click="toggleStatus(guest, RegistrationStatus.Cancelled)"
              :severity="guest.status === RegistrationStatus.Cancelled ? 'danger' : 'secondary'"
              text
              rounded
              :label="'Cancelada'"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-6 h-6"
                :class="guest.status === RegistrationStatus.Cancelled ? 'text-red-500' : 'text-gray-500'"
                >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
</div>
    
    <template #footer>
      <Button 
        label="Cerrar" 
        @click="showGuestListModal = false" 
        class="p-button-text" 
      />
    </template>
  </Dialog>
  </div>
</template>
  
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import axios from 'axios';
import { formEventValidation } from "@/Validations/Event/eventValidation";
import { useToast } from 'primevue/usetoast';
import { ref, onMounted } from 'vue';

const emit = defineEmits(["submit"]);
const toast = useToast();
const shareLink = ref('');
const showGuestListModal = ref(false);
const currentEventId = ref<number | null>(null);

// Estructura para invitados
interface Guest {
  id: number;
  name: string;
  email: string;
  status: RegistrationStatus;
  idInvitation?: number;
}

// Estados posibles
enum RegistrationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Cancelled = 'Cancelled'
}

const guests = ref<Guest[]>([]);

// Obtener invitados del evento
const fetchGuests = async () => {
  if (!currentEventId.value) return;
  
  try {
    const response = await axios.get(
      `https://localhost:7161/api/Event/GetEventById/${currentEventId.value}`
    );
    
    guests.value = response.data.invitations.map((inv: any) => ({
      id: inv.guest.id,
      name: inv.guest.name,
      email: inv.guest.email,
      status: inv.guestRegistration?.status || RegistrationStatus.Pending,
      idInvitation: inv.id
    }));
  } catch (error) {
    console.error('Error fetching guests:', error);
  }
};

// Crear evento
const submitForm = async (values: any, { resetForm }: { resetForm: () => void }) => {
  try {
    const response = await axios.post('https://localhost:7161/api/Event/Create', {
      ...values,
      EventDateTime: new Date(values.eventDateTime).toISOString()
    });

    currentEventId.value = response.data.id;
    shareLink.value = `https://tudominio.com/evento/${response.data.token}`;
    
    toast.add({
      severity: "success",
      summary: "Evento Creado",
      detail: "Evento creado exitosamente",
      life: 3000,
    });

    resetForm();
  } catch (error) {
    console.error('Error creating event:', error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo crear el evento",
      life: 3000,
    });
  }
};

// Actualizar estado de invitado
const toggleStatus = async (guest: Guest, status: RegistrationStatus) => {
  try {
    await axios.put(
      `https://localhost:7161/api/Invitation/UpdateStatus/${guest.idInvitation}`,
      { status }
    );
    
    guest.status = status;
    toast.add({
      severity: "success",
      summary: "Estado Actualizado",
      detail: `Estado cambiado a ${status}`,
      life: 2000,
    });
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

// Eliminar invitado
const deleteGuest = async (guest: Guest) => {
  try {
    await axios.delete(
      `https://localhost:7161/api/Invitation/Delete/${guest.idInvitation}`
    );
    
    guests.value = guests.value.filter(g => g.id !== guest.id);
    toast.add({
      severity: "success",
      summary: "Invitado Eliminado",
      detail: "Invitado removido del evento",
      life: 2000,
    });
  } catch (error) {
    console.error('Error deleting guest:', error);
  }
};

// Copiar enlace
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    toast.add({
      severity: "success",
      summary: "Enlace Copiado",
      detail: "El enlace se copió al portapapeles",
      life: 2000,
    });
  } catch (error) {
    console.error("Error al copiar:", error);
  }
};

onMounted(() => {
  if (currentEventId.value) {
    fetchGuests();
  }
});

  </script>
  
  