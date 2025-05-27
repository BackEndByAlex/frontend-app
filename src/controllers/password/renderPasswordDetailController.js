import { getFromPasswordService } from '../../services/password/getFromPasswordService.js'

/**
 * Renders the password detail page with entry and history data.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export async function renderPasswordDetail (req, res, next) {
  const token = req.session.user?.jwt
  const id = req.params.id

  try {
    const entry = await getFromPasswordService(`passwords/${id}`, token)

    const history = await getFromPasswordService(`passwords/${id}/history`, token)
    console.log('History data fetched:', history)

    return res.render('./passwords/details', {
      user: req.session.user,
      csrfToken: req.csrfToken(),
      entry,
      history,
      hideHeader: true,
      isCodeVerified: req.session.isCodeVerified,
      pageType: 'passwordDetail'
    })
  } catch (err) {
    if (err.message.includes('404')) {
      req.flash('error', 'Lösenordet kunde inte hittas.')
      return res.status(404).redirect('../dashboard')
    } else if (err.message.includes('401')) {
      req.flash('error', 'Sessionen har gått ut. Logga in igen.')
      return res.status(401).redirect('../login')
    }
    next(err)
  }
}
