import { verifyCodeFromAuthService, getFromPasswordService } from '../services/apiClient.js'
import { logger } from '../config/winston.js'
import { getFeedbackFromAuth } from './feedbackController.js'

/**
 * Renders the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderHome = async (req, res) => {
  try {
    const feedbacks = await getFeedbackFromAuth()

    res.render('home/index', {
      title: 'Home',
      user: req.session.user,
      feedbacks // skicka med feedback till vyn
    })
  } catch (err) {
    res.render('home/index', {
      title: 'Home',
      user: req.session.user,
      feedbacks: []
    })
  }
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
    return res.redirect('./')
  }

  const isCodeVerified = req.session.isCodeVerified || false

  res.render('dashboard/dashboard', {
    user,
    isCodeVerified,
    hideHeader: true,
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

/**
 * Checks if the user session exists and returns the appropriate status.
 *
 * @param {object} req - The request object containing the session data.
 * @param {object} res - The response object used to send the status.
 * @returns {object} - A JSON response with the session status.
 */
export const checkSession = (req, res) => {
  if (!req.session?.user) {
    req.flash('error', 'Session expired')
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

/**
 * Renders the password page with saved passwords.
 *
 * @param {object} req - The request object containing session data.
 * @param {object} res - The response object used to render the page.
 * @returns {Promise<void>} Renders the dashboard with passwords.
 */
export const renderPassword = async (req, res) => {
  const token = req.session.user?.jwt
  let passwords = []

  try {
    passwords = await getFromPasswordService('passwords', token)
    console.log('[PASSWORDS]', passwords)
  } catch (err) {
    console.error('[FETCH PASSWORDS ERROR]', err)
    req.flash('error', 'Kunde inte hämta sparade lösenord.')
  }

  res.render('dashboard/dashboard', {
    user: req.session.user,
    csrfToken: req.csrfToken(),
    passwords,
    isCodeVerified: req.session.isCodeVerified,
    hideHeader: true
  })
}

/**
 * Renders the appropriate dashboard based on code verification status.
 *
 * @param {object} req - The request object containing session data.
 * @param {object} res - The response object used to render the page.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Renders the dashboard or password page.
 */
export const renderSmartDashboard = (req, res, next) => {
  if (req.session.isCodeVerified) {
    return renderPassword(req, res, next)
  } else {
    return renderDashboard(req, res, next)
  }
}
