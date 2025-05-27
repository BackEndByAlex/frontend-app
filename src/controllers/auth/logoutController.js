import { logger } from '../../config/winston.js'

/**
 * Logs out the user by destroying the session and redirects to the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error('Session destruction failed:', err)
      return res.status(500).json({ message: 'Logout failed' })
    }
    res.clearCookie('connect.sid')
    return res.status(302).redirect('./')
  })
}
