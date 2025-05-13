import { verifyCodeFromAuthService } from '../../services/apiClient.js'
import { logger } from '../../config/winston.js'

/**
 * Handles the verification of a code.
 *
 * @param {object} req - The request object containing the code in the body.
 * @param {object} res - The response object used to redirect the user.
 * @returns {Promise<void>} Redirects to the dashboard page after processing.
 */
export const postVerifyCode = async (req, res) => {
  const { code } = req.body
  const token = req.session.user?.jwt
  const email = req.session.user?.email

  try {
    await verifyCodeFromAuthService(email, code, token)

    req.session.isCodeVerified = true
    req.flash('success', 'Koden har verifierats!')
    return res.redirect('./dashboard') //
  } catch (err) {
    logger.error('[VERIFICATION ERROR]', { error: err })
    req.session.isCodeVerified = false
    req.flash('error', err.message || 'Fel vid verifiering.')
    return res.redirect('./dashboard') // visa verifieringsformulär igen
  }
}
