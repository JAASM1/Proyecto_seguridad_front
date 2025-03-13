<template>
  <Form
    @submit="submitForm"
    :validation-schema="formEventValidation"
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

    <button
      type="submit"
      class="font-bold bg-primary rounded-lg py-3 mt-5 cursor-pointer"
    >
      Crear evento
    </button>
  </Form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import { formEventValidation } from "@/Validations/Event/eventValidation";
import type { Event } from "@/interfaces/Event/event";

const emit = defineEmits(["submit"]);

const submitForm = (values: Event, { resetForm }: any) => {
  emit("submit", values);
  resetForm();
};
</script>
