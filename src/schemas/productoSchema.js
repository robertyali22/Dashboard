import yup from "yup";

//Ojito
// export const productoSchema = yup.object({

export const productoSchemaValidation = yup.object({
    nombre: yup
        .string()
        .required("El nombre del producto es obligatorio"),
    descripcion: yup
        .string()
        .required("La descripción es obligatoria"),
    precio: yup
        .number()
        .required("El precio es obligatorio")
        .positive("El precio debe ser un valor positivo"),
    stock: yup
        .number()
        .required("El stock es obligatorio")
        .integer("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
    img: yup
        .string()
        .required("La imagen es obligatoria")
        .url("La URL de la imagen no es válida"),
    categoria_id: yup
        .string()
        .required("El identificador de la categoría es obligatorio"),
    tienda_id: yup
        .string()
        .required("El identificador de la tienda es obligatorio"),
});
