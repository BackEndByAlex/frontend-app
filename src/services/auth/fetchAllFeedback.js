import { AUTH_URL } from '../setup.js'

/**
 * Fetches all feedback from the auth-service.
 *
 * @returns {Promise<object[]>} - A promise that resolves to an array of feedback objects.
 */
export async function fetchAllFeedback () {
  const response = await fetch(`${AUTH_URL}/feedback-get-all`)
  if (!response.ok) throw new Error('Kunde inte hämta feedback')
  return await response.json()
}
