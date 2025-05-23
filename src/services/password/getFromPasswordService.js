import { PASSWORD_URL } from '../setup.js'

/**
 * Sends a GET request to the password-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'user-info').
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} - The response data.
 */
export async function getFromPasswordService (endpoint, token) {
  const res = await fetch(`${PASSWORD_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Fel vid hämtning från password-service')
  }

  return data
}
