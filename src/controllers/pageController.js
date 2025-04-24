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
  const user = req.session?.user
  if (!user) return res.redirect('/login')

  res.render('dashboard/dashboard', { user })
}
