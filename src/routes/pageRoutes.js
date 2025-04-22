import express from 'express'
import {
  renderRegister,
  getFirebaseConfig,
  handleGoogleLoginProxy,
  renderDashboard,
  renderLogin,
  handleFormRegistration,
  handleFormLogin,
  logout,
  renderHome
} from '../controllers/viewController.js'
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
