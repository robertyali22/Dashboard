import { Router } from 'express'
import { register, login, logout, profile } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateAuth } from '../middlewares/ValidateAuth.js'
import { requestLogger } from '../middlewares/RequestLogger.js'

const router = Router()

router.post('/register', validateAuth, register)
router.post('/login', validateAuth, requestLogger, login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)

export default router