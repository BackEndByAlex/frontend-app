import { AUTH_URL } from '../setup.js'
import { logger } from '../../config/winston.js'

/**
 * Sends a verification code after form login.
 *
 * @param {string} token - JWT token.
 * @returns {Promise<void>}
 */
export async function sendVerificationCodeAfterLogin (token) {
  try {
    const response = await fetch(`${AUTH_URL}/send-verification-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    const responseBody = await response.text() // läs svaret som text för debug

    if (!response.ok) {
      logger.error('[SEND VERIFICATION CODE ERROR]')
      logger.error('Status:', response.status)
      logger.error('Response body:', responseBody)
      throw new Error('Kunde inte skicka verifieringskod efter login.')
    }
  } catch (error) {
    logger.error('[SEND VERIFICATION CODE LOGIN ERROR]', { error })
    throw error
  }
}
