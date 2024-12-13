import yup from 'yup'

export const authSchema = yup.object({

    email: yup
        .string()
        .email("Ingrese un correo electrónico valido")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(4, "Ingresar 04 dígitos como mínimo")
        .max(8, "Ingresar 08 dígitos como máximo")
        .required("La contraseña es obligatoria")

})