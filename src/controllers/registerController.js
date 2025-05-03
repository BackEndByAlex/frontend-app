import { validateRegisterForm } from '../validators/registerValidator.js'
import { registerUser } from '../services/registrationService.js'
import { logger } from '../config/winston.js'

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
    req.flash('error', validationError)
    return res.redirect('./register')
  }

  try {
    await registerUser(req.body)
    req.flash('success', 'Registreringen lyckades! Du kan nu logga in.')
    return res.redirect('./login')
  } catch (err) {
    logger.error('[REGISTER ERROR]', { error: err })
    req.flash('error', err.message || 'Kunde inte registrera dig. Försök igen senare.')
    return res.redirect('./register')
  }
}
