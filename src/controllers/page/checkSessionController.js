/**
 * Checks if the user session exists and returns the appropriate status.
 *
 * @param {object} req - The request object containing the session data.
 * @param {object} res - The response object used to send the status.
 * @returns {object} - A JSON response with the session status.
 */
export const checkSession = (req, res) => {
  if (!req.session?.user) {
    req.flash('error', 'Session expired')
    return res.status(401).json({ message: 'Session expired' })
  }
  req.flash('error', 'Session expired')
  return res.status(200)
}
