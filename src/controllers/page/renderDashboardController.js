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
    pageType: 'dashboard'
  })
}
