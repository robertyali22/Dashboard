import yup from "yup";

export const tiendaSchemaValidation = yup.object({
    nombre: yup
        .string()
        .required("El nombre de la tienda es obligatorio"),
    direccion: yup
        .string()
        .required("La dirección de la tienda es obligatoria"),
    ciudad: yup
        .string()
        .required("La ciudad es obligatoria"),
    contacto: yup
        .string()
        .required("La información de contacto es obligatoria"),
});
