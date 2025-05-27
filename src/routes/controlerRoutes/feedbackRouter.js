import express from 'express'
import { sendFeedbackToAuth } from '../../controllers/feedback/sendFeedbackController.js'
import { profanityFilter } from '../../validators/profanityValidator.js'

const router = express.Router()

// Skickar in ny feedback
router.post('/feedback/send', profanityFilter, sendFeedbackToAuth)

export default router
