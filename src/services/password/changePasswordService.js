import { PASSWORD_URL } from '../setup.js'

/**
 * Sends a PUT request to the password-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'change-password').
 * @param {object} body - The request body.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} - The response data.
 */
export async function changePasswordService (endpoint, body, token) {
  const res = await fetch(`${PASSWORD_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Fel vid PUT mot password-service')
  }

  return data
}
