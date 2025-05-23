import express from 'express'
import { renderRegister } from '../../controllers/register/renderRegisterController.js'
import { handleFormRegistration } from '../../controllers/register/handleRegistrationController.js'

const router = express.Router()

router.get('/register', renderRegister)

router.post('/register', handleFormRegistration)

export default router
