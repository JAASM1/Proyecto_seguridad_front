import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email no válido"
    )
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const RegisterValidation = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email no válido"
    )
    .required("El email es requerido"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/,
      "El password debe tener al menos 6 caracteres, una letra mayúscula, un número y un carácter especial"
    )
    .required("El password es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Los passwords no coinciden")
    .required("Confirma el password"),
});
