import { sendFeedback } from '../../services/auth/sendFeedback.js'

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
    req.flash('success', 'Tack för din feedback!')
    res.redirect('../')
  } catch (err) {
    req.flash('error', 'Kunde inte skicka feedback, försök igen senare.')
    res.redirect('../')
  }
}
