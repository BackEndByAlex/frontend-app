import { authenticateGoogleUser, sendVerificationCode } from '../../services/authService.js'
import { logger } from '../../config/winston.js'

/**
 * Handles Google login by authenticating the user, storing session data,
 * and sending a verification code before redirecting to the dashboard.
 *
 * @param {object} req - The request object containing the ID token in the body.
 * @param {object} res - The response object used to redirect or render views.
 */
export const handleGoogleLoginProxy = async (req, res) => {
  try {
    const { idToken } = req.body

    const { payload, token } = await authenticateGoogleUser(idToken)
    req.session.user = {
      ...payload,
      jwt: token
    }

    req.session.isCodeVerified = false
    await sendVerificationCode(idToken)
    req.flash('success', 'Google-inloggning lyckades!')
    res.status(200).json({ message: 'Session created' })
  } catch (err) {
    logger.error('[GOOGLE LOGIN ERROR]', { error: err })
    res.status(403).json({ error: 'Google-login misslyckades' })
  }
}
