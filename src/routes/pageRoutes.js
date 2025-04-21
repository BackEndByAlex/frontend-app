import express from 'express'
import {
  renderRegister,
  getFirebaseConfig,
  handleGoogleLoginProxy,
  renderDashboard,
  renderLogin,
  handleFormRegistration
} from '../controllers/viewController.js'

export const router = express.Router()

router.get('/', (req, res) => {
  res.render('home/index') // visar index.ejs
})

router.get('/register', renderRegister)
router.get('/firebase-config', getFirebaseConfig)
router.post('/auth/google', handleGoogleLoginProxy)
router.get('/dashboard', renderDashboard)
router.get('/login', renderLogin)
router.post('/register', handleFormRegistration)
