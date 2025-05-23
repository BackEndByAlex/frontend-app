import { PASSWORD_URL } from '../setup.js'

/**
 * Sends a DELETE request to the password-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'delete-user').
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} - The response data.
 */
export async function deletePasswordService (endpoint, token) {
  const res = await fetch(`${PASSWORD_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Fel vid borttagning från password-service')
  return data
}
