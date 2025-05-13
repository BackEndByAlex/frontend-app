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
