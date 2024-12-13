import yup from 'yup'

export const taskSchema = yup.object({

    title: yup
        .string()
        .required("El titulo es obligatorio"),
    description: yup
        .string()
        .required("La descripción es requerida")

})