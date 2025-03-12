import * as Yup from "yup";

export const formEventValidation = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string().required("La descripción es requerida"),
  date: Yup.date().required("La fecha y hora es requerida"),
  location: Yup.string().required("La ubicación es requerida"),
});
