import { logger } from '../../config/winston.js'
import { loginWithForm } from '../../services/auth/loginWithForm.js'
import { sendVerificationCodeAfterLogin } from '../../services/auth/sendVerificationCodeAfterLogin.js'
/**
 * Handles form-based login by sending credentials to the auth-service,
 * verifying the token, saving user data in the session, and sending a verification code.
 *
 * @param {object} req - The request object containing the login credentials in the body.
 * @param {object} res - The response object used to render views or redirect.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const handleFormLogin = async (req, res) => {
  try {
    if (!req.session) {
      logger.info('[LOGIN ERROR] No active session found.')
      req.flash('error', 'Inloggningen misslyckades, vänligen försök igen.')
      return res.redirect('../login')
    }

    const { payload, token } = await loginWithForm(req.body)

    req.session.user = {
      ...payload,
      jwt: token
    }

    req.session.isCodeVerified = false
    await sendVerificationCodeAfterLogin(token)
    req.flash('success', 'Inloggning lyckades! En verifieringskod har skickats till din e-post.')
    res.redirect('../dashboard')
  } catch (err) {
    logger.error('[LOGIN ERROR]', { error: err })
    req.flash('error', 'Fel vid inloggning. Kontrollera dina uppgifter.')
    res.redirect('../login')
  }
}
