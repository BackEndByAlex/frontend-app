import { postToPasswordService } from '../../services/password/postToPasswordService.js'
import { logger } from '../../config/winston.js'

/**
 * Handles saving a password for a user. Ensures the user is verified and all required fields are provided.
 *
 * @param {object} req - The request object, containing session and body data.
 * @param {object} res - The response object, used to send responses to the client.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const savePassword = async (req, res) => {
  try {
    if (!req.session?.user || !req.session.isCodeVerified) {
      req.flash('error', 'Du måste vara verifierad för att spara lösenord.')
      return res.redirect('./dashboard')
    }

    const { service, username, password } = req.body

    if (!service || !username || !password) {
      req.flash('error', 'Alla fält måste fyllas i.')
      return res.status(400).redirect('./dashboard')
    }

    const token = req.session.user.jwt

    await postToPasswordService('passwords', {
      service,
      username,
      password
    }, token)

    req.flash('success', 'Lösenord sparat!')
    return res.status(302).redirect('./dashboard')
  } catch (error) {
    logger.error('[SAVE PASSWORD ERROR]', { error })
    req.flash('error', 'Kunde inte spara lösenord.')
    return res.status(500).redirect('./dashboard')
  }
}
