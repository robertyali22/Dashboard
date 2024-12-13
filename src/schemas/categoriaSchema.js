import yup from "yup";

//Ojito
// export const productoSchema = yup.object({

export const categoriaSchemaValidation = yup.object({
    nombre: yup
        .string()
        .required("El nombre de la categoría es obligatorio"),
    descripcion: yup
        .string(),
    tienda_id: yup
        .string()
        .required("El identificador de la tienda es obligatorio"),
});