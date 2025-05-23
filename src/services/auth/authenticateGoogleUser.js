import { AUTH_URL, publicKey } from '../setup.js'
import jwt from 'jsonwebtoken'
import { logger } from '../../config/winston.js'

/**
 * Authenticates a user via Google ID token.
 *
 * @param {string} idToken - The Google ID token.x
 * @returns {object} - The session user data.
 */
export async function authenticateGoogleUser (idToken) {
  try {
    const response = await fetch(`${AUTH_URL}/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Auth-service rejected Google token.')
    }

    const { token } = await response.json()
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    return { payload, token }
  } catch (error) {
    logger.error('[GOOGLE AUTH SERVICE ERROR]', { error })
    throw new Error('Google-inloggning misslyckades. Försök igen.')
  }
}
