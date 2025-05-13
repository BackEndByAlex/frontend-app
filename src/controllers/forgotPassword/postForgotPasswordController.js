import { postToAuthService } from '../../services/apiClient.js'
import { logger } from '../../config/winston.js'

/**
 * Handles the forgot password form submission.
 *
 * @param {object} req - The request object containing the form data.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const postForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    await postToAuthService('forgot-password', { email })
    req.flash('info', 'Om e-postadressen finns skickas en återställningslänk.')
    res.redirect('./forgot-password')
  } catch (err) {
    logger.error('[POST FORGOT PASSWORD ERROR]', err)
    req.flash('error', 'Kunde inte skicka återställningslänken.')
    res.redirect('../forgot-password')
  }
}
