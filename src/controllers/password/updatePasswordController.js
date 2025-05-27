import { changePasswordService } from '../../services/password/changePasswordService.js'

/**
 * Updates the password for a specific entry.
 *
 * @param {object} req - The request object containing session and body data.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the password is updated.
 */
export async function updatePassword (req, res, next) {
  const token = req.session.user.jwt
  const id = req.params.id
  const { password } = req.body

  try {
    await changePasswordService(
      `passwords/${id}`,
      { password },
      token
    )

    req.flash('success', 'Lösenordet har uppdaterats')
    return res.status(302).redirect(`../../passwords/${id}`)
  } catch (err) {
    req.flash('error', err.message)
    return res.status(400).redirect(`./passwords/${id}`)
  }
}
