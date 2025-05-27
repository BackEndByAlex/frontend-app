import { AUTH_URL } from '../setup.js'
import { logger } from '../../config/winston.js'

/**
 * Verifies a code using the authentication service.
 *
 * @param {string} email - The email address to verify.
 * @param {string} code - The verification code.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} A promise that resolves to the verification result.
 */
export async function verifyCodeFromAuthService (email, code, token) {
  try {
    const res = await fetch(`${AUTH_URL}/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, code })
    })

    if (!res.ok) {
      if (res.status === 404) {
        // Specifikt fall: ogiltig kod
        throw new Error('Ogiltig kod')
      }
      const errorText = await res.text()
      throw new Error(`Fel vid verifiering: ${errorText}`)
    }

    return await res.json()
  } catch (error) {
    logger.error('[VERIFY CODE API ERROR]', { error })
    throw error
  }
}
