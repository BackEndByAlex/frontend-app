import { postToAuthService } from '../services/apiClient.js'

/**
 * Renders the forgot password page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getForgotPassword = (req, res) => {
  res.render('users/forgotPassword')
}

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
    next(err)
  }
}

/**
 * Renders the reset password page for the user.
 *
 * @param {object} req - The request object containing the query parameters.
 * @param {object} res - The response object.
 */
export const getResetPassword = (req, res) => {
  const { token } = req.query
  res.render('users/resetPassword', { token })
}

/**
 * Handles the reset password form submission.
 *
 * @param {object} req - The request object containing the form data.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const postResetPassword = async (req, res, next) => {
  try {
    const { token, password, confirm } = req.body
    if (password !== confirm) {
      req.flash('error', 'Lösenorden matchar inte')
      return res.redirect(`./reset-password?token=${token}`)
    }
    await postToAuthService('reset-password', { token, password })
    req.flash('success', 'Ditt lösenord är uppdaterat. Du kan logga in igen.')
    res.redirect('./login')
  } catch (err) {
    // om auth-servicen returnerar 400 med vårt error-fält, skickas det här:
    req.flash('error', err.message || 'Något gick fel')
    res.redirect(`./reset-password?token=${req.body.token}`)
  }
}
