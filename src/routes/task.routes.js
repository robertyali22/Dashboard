import { Router } from 'express'
import { createTasks, readTask, readTasks, updateTasks, deleteTasks } from '../controllers/task.controller.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateTask } from '../middlewares/ValidateTask.js'

const router = Router()
// authRequired,

router.post('/tasks', validateTask, createTasks)
router.get('/tasks', readTasks)
router.get('/tasks/:id', readTask)
router.put('/tasks/:id', updateTasks)
router.delete('/tasks/:id', deleteTasks)

export default router