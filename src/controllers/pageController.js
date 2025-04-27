import { verifyCodeFromAuthService } from '../services/apiClient.js'

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
  if (!user) return res.redirect('/login')

  const codeSuccess = req.session.codeSuccess
  const codeError = req.session.codeError

  req.session.codeSuccess = null
  req.session.codeError = null

  res.render('dashboard/dashboard', {
    user,
    codeSuccess,
    codeError
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

    await verifyCodeFromAuthService(user, code, token)

    req.session.codeSuccess = 'Koden har verifierats!'
    req.session.codeError = 'Koden är felaktig!'

    return res.redirect('/dashboard')
  } catch (err) {
    console.error('[Fel vid verifiering]', err.message)
    req.session.codeError = 'Något gick fel vid verifiering'
    return res.redirect('/dashboard')
  }
}
