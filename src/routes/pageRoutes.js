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
  postVerifyCode,
  checkSession,
  renderSmartDashboard
} from '../controllers/pageController.js'

import { getFirebaseConfig } from '../controllers/fireBaseController.js'
import { requireAuth } from '../authMiddleware/authMiddleware.js'
import { generatePassword, renderPasswordDetail, updatePassword, deletePassword } from '../controllers/passwordController.js'
import { savePassword } from '../controllers/savePasswordController.js'
import { sendFeedbackToAuth } from '../controllers/feedbackController.js'
import {
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword
} from '../controllers/forgetPassowrdController.js'

export const router = express.Router()
router.get('/', renderHome)

router.get('/login', renderLogin)
router.get('/firebase-config', getFirebaseConfig)
router.get('/register', renderRegister)
router.get('/check-session', checkSession)
router.post('/google/proxy', handleGoogleLoginProxy)
router.get('/dashboard', requireAuth, renderSmartDashboard)
router.get('/generate-password', generatePassword)
router.get('/passwords/:id', requireAuth, renderPasswordDetail)
router.post('/passwords/:id/delete', requireAuth, deletePassword)

router
  .route('/forgot-password')
  .get(getForgotPassword)
  .post(postForgotPassword)

router
  .route('/reset-password')
  .get(getResetPassword)
  .post(postResetPassword)

router.post('/passwords/:id/change', requireAuth, updatePassword)

router.post('/register', handleFormRegistration)
router.post('/auth/google', handleGoogleLoginProxy)
router.post('/auth/login', handleFormLogin)
router.post('/save-password', requireAuth, savePassword)
router.post('/logout', logout)
router.post('/verify-code', postVerifyCode)
router.post('/feedback/send', sendFeedbackToAuth)
