import yup from "yup";

export const clienteSchemaValidation = yup.object({
    nombre: yup
        .string()
        .required("El nombre del cliente es obligatorio"),
    correo: yup
        .string()
        .email("El correo no es válido")
        .required("El correo del cliente es obligatorio"),
    telefono: yup
        .string(),
    direccion: yup
        .string(),
    fecha_registro: yup
        .date()
        .default(() => new Date()),
});

