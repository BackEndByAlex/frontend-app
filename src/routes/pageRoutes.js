import express from 'express'

// De olika sub-routerarna
import authRouter from './controlerRoutes/authRouter.js'
import registerRouter from './controlerRoutes/registerRouter.js'
import forgotPasswordRouter from './controlerRoutes/forgotPasswordRouter.js'
import passwordRouter from './controlerRoutes/passwordRouter.js'
import feedbackRouter from './controlerRoutes/feedbackRouter.js'
import firebaseRouter from './controlerRoutes/firebaseRouter.js'
import pageRouter from './controlerRoutes/pageRouter.js'

const router = express.Router()

// Publika sidor (renderHome etc.)
router.use('/', pageRouter)

// Auth-flow
router.use('/', authRouter)

// Registrering
router.use('/', registerRouter)

// Glömt lösenord
router.use('/', forgotPasswordRouter)

// Hantera sparade lösenord (CRUD)
router.use('/', passwordRouter)

// Feedback
router.use('/', feedbackRouter)

// Firebase-konfig
router.use('/', firebaseRouter)

export default router
