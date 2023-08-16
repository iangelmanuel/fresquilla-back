import express from 'express'
import checkAuth from '../middleware/checkAuth'
import { login, adminProfile } from '../controllers/adminController'

const router = express.Router()
router.post('/login', login)
router.get('/', checkAuth, adminProfile)

export default router
