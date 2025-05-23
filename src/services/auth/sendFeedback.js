import { AUTH_URL } from '../setup.js'

/**
 * Sends feedback to the auth-service.
 *
 * @param {string} message - The feedback message to send.
 * @returns {Promise<void>} - Resolves when the feedback is successfully sent.
 */
export async function sendFeedback (message) {
  const response = await fetch(`${AUTH_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })

  if (!response.ok) throw new Error('Misslyckades att skicka feedback')
}
