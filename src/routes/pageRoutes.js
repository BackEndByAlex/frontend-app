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

export const router = express.Router()

router.get('/', renderHome)
router.get('/register', renderRegister)
router.get('/firebase-config', getFirebaseConfig)
router.post('/auth/google', handleGoogleLoginProxy)
router.get('/dashboard', requireAuth, renderDashboard)
router.get('/login', renderLogin)
router.post('/register', handleFormRegistration)
router.post('/auth/login', handleFormLogin)
router.post('/logout', logout)
router.post('/verify-code', postVerifyCode)
