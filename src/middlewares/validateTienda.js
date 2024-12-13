import { tiendaSchemaValidation } from "../schemas/tiendaSchema.js";

export const validateTienda = (req, res, next) => {
    tiendaSchemaValidation.validate(req.body, { abortEarly: false })
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
