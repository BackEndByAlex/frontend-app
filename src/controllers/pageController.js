import { verifyCodeFromAuthService } from '../services/apiClient.js'
import { logger } from '../config/winston.js'

/**
 * Renders the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderHome = (req, res) => {
  res.render('home/index', {
    user: req.session.user
  })
}

/**
 * Renders the dashboard page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 * @throws {Error} If the user is not authenticated.
 */
export const renderDashboard = (req, res) => {
  const user = req.session.user

  if (!user) {
    req.flash('error', 'Du måste logga in först.')
    return res.redirect('/login')
  }

  const isCodeVerified = req.session.isCodeVerified || false

  res.render('dashboard/dashboard', {
    user,
    isCodeVerified
  })
}

/**
 * Handles the verification of a code.
 *
 * @param {object} req - The request object containing the code in the body.
 * @param {object} res - The response object used to redirect the user.
 * @returns {Promise<void>} Redirects to the dashboard page after processing.
 */
export const postVerifyCode = async (req, res) => {
  try {
    const { code } = req.body
    const token = req.session.user?.jwt
    const user = req.session.user?.email

    try {
      await verifyCodeFromAuthService(user, code, token)

      req.session.isCodeVerified = true
      req.flash('success', 'Koden har verifierats!')
      return res.redirect('/dashboard')
    } catch (err) {
      logger.error('[VERIFICATION ERROR]', { error: err })
      req.session.isCodeVerified = false
      req.flash('error', 'Ogiltig kod. Försök igen.')
      return res.redirect('/dashboard')
    }
  } catch (err) {
    logger.error('[VERIFICATION ERROR]', { error: err })
    req.session.isCodeVerified = false
    req.flash('error', 'Fel vid verifiering av kod. Försök igen.')
    return res.redirect('/dashboard')
  }
}

/**
 * Checks if the user session exists and returns the appropriate status.
 *
 * @param {object} req - The request object containing the session data.
 * @param {object} res - The response object used to send the status.
 * @returns {object} - A JSON response with the session status.
 */
export const checkSession = (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: 'Session expired' })
  }
  req.flash('error', 'Session expired')
  return res.status(200)
}

/**
 * Renders the verify code page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderVerifyCodePage = (req, res) => {
  res.render('verify-code', {
    title: 'Verifiera din kod',
    csrfToken: req.csrfToken()
  })
}
