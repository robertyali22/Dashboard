import { productoSchemaValidation } from "../schemas/productoSchema.js";

export const validateProducto = (req, res, next) => {
    productoSchemaValidation.validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((err) => {
            res.status(400).json({
                errors: err.inner.map(e => ({
                    path: e.path,
                    message: e.message
                }))
            });
        });
};