import express from 'express'
import { sendFeedbackToAuth } from '../../controllers/feedback/sendFeedbackController.js'

const router = express.Router()

// Skickar in ny feedback
router.post('/feedback/send', sendFeedbackToAuth)

export default router
