import express from 'express'
import {
  renderRegister,
  handleFormRegistration
} from '../controllers/registerController.js'

import {
  renderLogin,
  handleFormLogin,
  handleGoogleLoginProxy,
  logout
} from '../controllers/authController.js'

import {
  renderHome,
  renderDashboard,
  postVerifyCode
} from '../controllers/pageController.js'

import { getFirebaseConfig } from '../controllers/fireBaseController.js'
import { requireAuth } from '../authMiddleware/authMiddleware.js'
import { generatePassword } from '../controllers/passwordController.js'

export const router = express.Router()

router.get('/', renderHome)
router.get('/firebase-config', getFirebaseConfig)
router.get('/register', renderRegister)
router.get('/login', (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}, renderLogin)

router.get('/dashboard', requireAuth, renderDashboard)
router.get('/generate-password', generatePassword)

router.post('/register', handleFormRegistration)
router.post('/auth/google', handleGoogleLoginProxy)
router.post('/auth/login', handleFormLogin)

router.post('/logout', logout)
router.post('/verify-code', postVerifyCode)
