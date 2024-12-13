import { taskSchema } from "../schemas/taskSchema.js"

export const validateTask = (req, res, next) => {
    taskSchema.validate(req.body, {abortEarly: false})
    .then(()=> { 
        next();
    })
    .catch((err) => {
        res.status(400).json({errors: err.inner.map(e => ({
            path: e.path,
            message: e.message
        }))})
    })
}