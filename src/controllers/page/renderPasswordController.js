import { getFromPasswordService } from '../../services/apiClient.js'

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
  } catch (err) {
    req.flash('error', 'Kunde inte hämta sparade lösenord.')
  }

  res.render('dashboard/dashboard', {
    user: req.session.user,
    csrfToken: req.csrfToken(),
    passwords,
    isCodeVerified: req.session.isCodeVerified,
    hideHeader: true,
    pageType: 'dashboard'
  })
}
