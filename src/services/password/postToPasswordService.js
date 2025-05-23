import { PASSWORD_URL } from '../setup.js'

/**
 * Sends a POST request to the password-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'reset-password').
 * @param {object} body - The request body.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} - The response data.
 */
export async function postToPasswordService (endpoint, body, token) {
  const response = await fetch(`${PASSWORD_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Fel mot password-service')
  }

  return data
}
