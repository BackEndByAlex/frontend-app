/**
 * Renders the forgot password page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getForgotPassword = (req, res) => {
  res.render('users/forgotPassword')
}
