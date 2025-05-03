import { generateStrongPassword } from '../utils/passwordGenerator.js'

/**
 * Generates a strong password and sends it in the response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const generatePassword = (req, res) => {
  const password = generateStrongPassword()
  res.status(200).json({ password })
}
