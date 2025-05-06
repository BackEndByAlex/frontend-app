import {
  loginWithForm,
  sendVerificationCodeAfterLogin,
  authenticateGoogleUser,
  sendVerificationCode
} from '../services/authService.js'
import { logger } from '../config/winston.js'

/**
 * Renders the login page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderLogin = (req, res) => {
  res.locals.csrfToken = req.csrfToken()
  res.render('users/login')
}

/**
 * Logs out the user by destroying the session and redirects to the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error('Session destruction failed:', err)
      return res.status(500).json({ message: 'Logout failed' })
    }
    res.clearCookie('connect.sid')
    res.redirect('./')
  })
}

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

