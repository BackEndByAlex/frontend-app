/**
 * Renders the login page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderLogin = (req, res) => {
  res.locals.csrfToken = req.csrfToken()
  res.render('users/login')
}
