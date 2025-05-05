import fetch from 'node-fetch'
import { sendFeedback, fetchAllFeedback } from '../services/apiClient.js'

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

export const getFeedbackFromAuth = async () => {
  const res = await fetch('http://auth:4000/api/v1/feedback-get-all')
  const data = await res.json()
  return data
}
