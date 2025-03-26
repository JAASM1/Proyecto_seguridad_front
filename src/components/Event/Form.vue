<template>
  <Form
    @submit="submitForm"
    :validation-schema="formEventValidation"
    :initial-values="formValues"
    class="w-full max-w-lg mx-auto flex flex-col space-y-3"
    v-slot="{ resetForm }"
  >
    <div>
      <FloatLabel variant="in">
        <Field name="name" v-slot="{ field }">
          <InputText
            id="name"
            v-bind="field"
            variant="filled"
            class="w-full bg-inputColor"
            :class="{ 'p-filled': formValues.name }"
          />
        </Field>
        <label for="name">Nombre del evento</label>
      </FloatLabel>
      <ErrorMessage name="name" class="text-danger text-sm" />
    </div>

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
            :class="{ 'p-filled': formValues.description }"
          />
        </Field>
        <label for="description">Descripción</label>
      </FloatLabel>
      <ErrorMessage name="description" class="text-danger text-sm" />
    </div>

    <div class="flex w-full space-x-3">
      <div class="w-full">
        <FloatLabel variant="in" class="w-full">
          <Field name="eventDateTime" v-slot="{ field }">
            <DatePicker
              ref="datePickerRef"
              id="eventDateTime"
              showTime
              hourFormat="24"
              fluid
              v-model="formValues.eventDateTime"
              v-bind="field"
              class="custom-datepicker"
              :class="{ 'p-filled': formValues.eventDateTime }"
            />
          </Field>
          <label for="eventDateTime">Fecha y hora</label>
        </FloatLabel>
        <ErrorMessage name="date" class="text-danger text-sm" />
      </div>
    </div>

    <div>
      <FloatLabel variant="in">
        <Field name="location" v-slot="{ field }">
          <InputText
            id="location"
            v-bind="field"
            variant="filled"
            class="w-full bg-inputColor"
            :class="{ 'p-filled': formValues.location }"
          />
        </Field>
        <label for="location">Ubicación</label>
      </FloatLabel>
      <ErrorMessage name="location" class="text-danger text-sm" />
    </div>

    <button
      type="submit"
      class="font-bold text-white bg-primary rounded-lg py-3 mt-5 cursor-pointer"
    >
      Guardar evento
    </button>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import { formEventValidation } from "@/Validations/Event/eventValidation";
import type { EventForm } from "@/interfaces/Event/event";
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ event?: EventForm }>();
const emit = defineEmits(["submit"]);

const formValues = ref<EventForm>({
  name: "",
  description: "",
  eventDateTime: null,
  location: "",
  ...props.event,
});

const datePickerRef = ref(null);

// Función para parsear correctamente la fecha del backend
const parseBackendDate = (dateString: any) => {
  if (!dateString) return null;

  // Si la fecha tiene el formato del backend (2025-03-21 20:23:42.0000000)
  if (typeof dateString === "string" && dateString.includes(".")) {
    // Reemplazar el formato para hacerlo compatible con ISO
    const isoFormatted = dateString.replace(" ", "T").split(".")[0];
    return new Date(isoFormatted);
  }

  // Si ya es un objeto Date o tiene otro formato
  return new Date(dateString);
};

watch(
  () => props.event,
  (newEvent) => {
    if (newEvent) {
      const parsedDate = parseBackendDate(newEvent.eventDateTime);
      formValues.value = {
        ...newEvent,
        eventDateTime: parsedDate,
      };

      // Forzar la actualización del componente DatePicker
      nextTick(() => {
        if (formValues.value.eventDateTime) {
          // Asegurarnos que la propiedad modelValue se actualice correctamente
          if (datePickerRef.value && datePickerRef.value.$el) {
            datePickerRef.value.$emit(
              "update:modelValue",
              formValues.value.eventDateTime
            );
          }
        }
      });
    }
  },
  { immediate: true }
);

const submitForm = (values: Event, { resetForm }: any) => {
  emit("submit", values);
  resetForm();
};
</script>
