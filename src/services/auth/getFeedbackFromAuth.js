import { AUTH_URL } from '../setup.js'

/**
 * Retrieves all feedback from the authentication service.
 *
 * @returns {Promise<object>} - A promise that resolves to the feedback data.
 */
export const getFeedbackAuth = async () => {
  const res = await fetch(`${AUTH_URL}/feedback-get-all`)

  const data = await res.json()

  return data
}
