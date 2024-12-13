import yup from "yup";

//Ojito
// export const productoSchema = yup.object({

export const ventaSchemaValidation = yup.object({
    cliente_id: yup
        .string()
        .required("El identificador del cliente es obligatorio"),
    productos: yup
        .array()
        .of(
            yup.object({
                producto_id: yup
                    .string()
                    .required("El identificador del producto es obligatorio"),
                cantidad: yup
                    .number()
                    .required("La cantidad es obligatoria")
                    .min(1, "La cantidad debe ser al menos 1"),
                subtotal: yup
                    .number()
                    .required("El subtotal es obligatorio")
                    .min(0, "El subtotal no puede ser negativo"),
            })
        )
        .required("La lista de productos es obligatoria"),
    total: yup
        .number()
        .required("El total es obligatorio")
        .min(0, "El total no puede ser negativo"),
    tienda_id: yup
        .string()
        .required("El identificador de la tienda es obligatorio"),
});