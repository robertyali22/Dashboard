import { ventaSchemaValidation } from "../schemas/ventaSchema.js";

export const validateVenta = (req, res, next) => {
    ventaSchemaValidation.validate(req.body, { abortEarly: false })
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
