import * as Yup from "yup";

export const formEventValidation = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  eventDateTime: Yup.date().required("La fecha y hora es requerida").min(new Date(), "La fecha debe ser mayor a la fecha actual"),
  location: Yup.string().required("La ubicación es requerida"),
});
