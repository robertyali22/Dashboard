import { clienteSchemaValidation } from "../schemas/clienteSchema.js";

export const validateCliente = (req, res, next) => {
    clienteSchemaValidation.validate(req.body, { abortEarly: false })
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
