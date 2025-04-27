import { loginWithForm, sendVerificationCodeAfterLogin, authenticateGoogleUser, sendVerificationCode } from '../services/authService.js'

/**
 * Renders the login page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderLogin = (req, res) => {
  res.render('users/login')
}

/**
 * Logs out the user by destroying the session and redirects to the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
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
    const { payload, token } = await loginWithForm(req.body)

    req.session.user = {
      ...payload,
      jwt: token
    }

    await sendVerificationCodeAfterLogin(token)

    res.redirect('/dashboard')
  } catch (err) {
    console.error('[LOGIN] Fel vid inloggning:', err)
    req.session.destroy(() => {
      res.render('users/login', {
        error: err.message || 'Något gick fel. Försök igen senare.'
      })
    })
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
    const { payload, token } = await authenticateGoogleUser(req.body.idToken)

    req.session.user = {
      ...payload,
      jwt: token
    }

    await sendVerificationCode(req.body.idToken)

    res.redirect('/dashboard')
  } catch (err) {
    console.error('Proxy login failed:', err)
    res.redirect('/login')
  }
}
