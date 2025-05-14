import { AUTH_URL } from '../setup.js'
import { logger } from '../../config/winston.js'

/**
 * Sends a verification code for Google login.
 *
 * @param {string} idToken - The ID token to send.
 * @returns {Promise<void>}
 */
export async function sendVerificationCode (idToken) {
  try {
    const response = await fetch(`${AUTH_URL}/send-verification-code/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    })

    if (!response.ok) {
      throw new Error('Kunde inte skicka verifieringskod via Google.')
    }
  } catch (error) {
    logger.error('[SEND VERIFICATION CODE GOOGLE ERROR]', { error })
    throw error
  }
}
