import { categoriaSchemaValidation } from "../schemas/categoriaSchema.js";

export const validateCategoria = (req, res, next) => {
    categoriaSchemaValidation.validate(req.body, { abortEarly: false })
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
