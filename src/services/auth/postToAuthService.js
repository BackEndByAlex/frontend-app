import { AUTH_URL } from '../setup.js'
import { logger } from '../../config/winston.js'

/**
 * Sends a POST request to the auth-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'login' or 'register').
 * @param {object} body - The request body.
 * @returns {Promise<object>} - The response data.
 */
export async function postToAuthService (endpoint, body) {
  try {
    const response = await fetch(`${AUTH_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Svar från auth-service är inte JSON')
    }

    const data = await response.json()

    if (!response.ok) {
      const errMsg = data.error || data.message || 'Något gick fel mot auth-service'
      throw new Error(errMsg)
    }

    return data
  } catch (error) {
    logger.error(`[POST ${endpoint} SERVICE ERROR]`, { error })
    throw error
  }
}
