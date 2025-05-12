import fetch from 'node-fetch'
import { sendFeedback } from '../services/apiClient.js'

/**
 * Sends feedback to the authentication service.
 *
 * @param {object} req - The request object containing the feedback message in the body.
 * @param {object} res - The response object used to send the HTTP response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const sendFeedbackToAuth = async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).send('Meddelande krävs')

  try {
    await sendFeedback(message)
    res.redirect('../')
  } catch (err) {
    res.status(500).send('Fel vid vidarebefordran av feedback')
  }
}

/**
 * Retrieves all feedback from the authentication service.
 *
 * @returns {Promise<object>} - A promise that resolves to the feedback data.
 */
export const getFeedbackFromAuth = async () => {
  const res = await fetch('http://auth:4000/api/v1/feedback-get-all')
  const data = await res.json()
  return data
}
