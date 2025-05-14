import { getFeedbackAuth } from '../../services/auth/getFeedbackFromAuth.js'
import { logger } from '../../config/winston.js'

/**
 * Handles the request to get feedback from the authentication service.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} Sends a JSON response with feedback or an error message.
 */
export const getFeedbackFromAuth = async (req, res) => {
  try {
    const data = await getFeedbackAuth()

    return data
  } catch (err) {
    logger.error('[GET FEEDBACK ERROR]', err)
    res.status(500).json({ error: 'Kunde inte hämta feedback' })
  }
}
