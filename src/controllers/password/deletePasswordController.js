import { deletePasswordService } from '../../services/password/deletePasswordService.js'

/**
 * Deletes a password entry by ID.
 *
 * @param {object} req - The request object containing session and params data.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the password is deleted.
 */
export async function deletePassword (req, res, next) {
  const token = req.session.user.jwt
  const { id } = req.params
  try {
    await deletePasswordService(`passwords/${id}`, token)
    req.flash('success', 'Lösenordet har tagits bort')
    return res.status(302).redirect('../../dashboard')
  } catch (err) {
    req.flash('error', err.message)
    return res.status(400).redirect(`../../passwords/${id}`)
  }
}
