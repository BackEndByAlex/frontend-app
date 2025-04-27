import { validateRegisterForm } from '../validators/registerValidator.js'
import { registerUser } from '../services/registrationService.js'

/**
 * Renders the registration page for users.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderRegister = (req, res) => {
  res.render('users/register')
}

/**
 * Handles the form submission for user registration.
 *
 * @param {object} req - The request object containing form data.
 * @param {object} res - The response object used to render views or redirect.
 * @returns {void}
 * @throws {Error} If the request fails or if the response is not JSON.
 */
export const handleFormRegistration = async (req, res) => {
  const validationError = validateRegisterForm(req.body)
  if (validationError) {
    return res.render('users/register', { error: validationError })
  }

  try {
    await registerUser(req.body)
    return res.redirect('/login')
  } catch (err) {
    return res.render('users/register', { error: err.message || 'Registrering misslyckades' })
  }
}
