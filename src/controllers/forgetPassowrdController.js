import { postToAuthService } from '../services/apiClient.js'

export const getForgotPassword = (req, res) => {
  res.render('users/forgotPassword')
}

export const postForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    await postToAuthService('/auth/forgot-password', { email })
    req.flash('info', 'Om e-postadressen finns skickas en återställningslänk.')
    res.redirect('./forgot-password')
  } catch (err) {
    next(err)
  }
}

export const getResetPassword = (req, res) => {
  const { token } = req.query
  res.render('users/resetPassword', { token })
}

export const postResetPassword = async (req, res, next) => {
  try {
    const { token, password, confirm } = req.body
    if (password !== confirm) {
      req.flash('error', 'Lösenorden matchar inte')
      return res.redirect(`./reset-password?token=${token}`)
    }
    await postToAuthService('/auth/reset-password', { token, password })
    req.flash('success', 'Ditt lösenord är uppdaterat. Du kan logga in igen.')
    res.redirect('./login')
  } catch (err) {
    next(err)
  }
}
