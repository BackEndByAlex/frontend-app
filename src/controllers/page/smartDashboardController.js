import { renderPassword } from './renderPasswordController.js'
import { renderDashboard } from './renderDashboardController.js'

/**
 * Renders the appropriate dashboard based on code verification status.
 *
 * @param {object} req - The request object containing session data.
 * @param {object} res - The response object used to render the page.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Renders the dashboard or password page.
 */
export const renderSmartDashboard = (req, res, next) => {
  if (req.session.isCodeVerified) {
    return renderPassword(req, res, next)
  } else {
    return renderDashboard(req, res, next)
  }
}
