import express from 'express'
import { renderLogin } from '../../controllers/auth/loginController.js'
import { handleFormLogin } from '../../controllers/auth/formLoginController.js'
import { handleGoogleLoginProxy } from '../../controllers/auth/googleLoginController.js'
import { logout } from '../../controllers/auth/logoutController.js'

const router = express.Router()

router.get('/login', renderLogin)

router.post('/auth/login', handleFormLogin)

router.post('/google/proxy', handleGoogleLoginProxy)

router.post('/logout', logout)

export default router
