import { postToAuthService } from './postToAuthService.js'
import { logger } from '../../config/winston.js'
import { publicKey } from '../setup.js'
import jwt from 'jsonwebtoken'

/**
 * Logs in a user using form credentials.
 *
 * @param {object} credentials - The login credentials.
 * @returns {object} - The session user data.
 */
export async function loginWithForm (credentials) {
  try {
    const { token } = await postToAuthService('login', credentials)
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    return { payload, token }
  } catch (error) {
    logger.error('[LOGIN SERVICE ERROR]', { error })
    throw new Error('Fel vid inloggning. Försök igen.')
  }
}
