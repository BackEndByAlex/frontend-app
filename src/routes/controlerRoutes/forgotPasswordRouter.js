import express from 'express'
import {
  getForgotPassword
} from '../../controllers/forgotPassword/getForgotPasswordController.js'
import {
  postForgotPassword
} from '../../controllers/forgotPassword/postForgotPasswordController.js'
import {
  getResetPassword
} from '../../controllers/forgotPassword/getResetPasswordController.js'
import {
  postResetPassword
} from '../../controllers/forgotPassword/postResetPasswordController.js'

const router = express.Router()

router.get('/forgot-password', getForgotPassword)

router.post('/forgot-password', postForgotPassword)

router.get('/reset-password', getResetPassword)

router.post('/reset-password', postResetPassword)

export default router
