// import { generateStrongPassword } from '../utils/passwordGenerator.js'
// import { getFromPasswordService, changePasswordService, deletePasswordService } from '../services/apiClient.js'

// /**
//  * Generates a strong password and sends it in the response.
//  *
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  */
// export const generatePassword = (req, res) => {
//   const password = generateStrongPassword()
//   res.status(200).json({ password })
// }

// /**
//  * Renders the password detail page with entry and history data.
//  *
//  * @param {object} req - The request object.
//  * @param {object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  * @returns {Promise<void>} - A promise that resolves when the response is sent.
//  */
// export async function renderPasswordDetail (req, res, next) {
//   const token = req.session.user?.jwt
//   const id = req.params.id

//   try {
//     const entry = await getFromPasswordService(`passwords/${id}`, token)

//     const history = await getFromPasswordService(`passwords/${id}/history`, token)
//     console.log('History data fetched:', history)

//     return res.render('./passwords/details', {
//       user: req.session.user,
//       csrfToken: req.csrfToken(),
//       entry,
//       history,
//       hideHeader: true,
//       isCodeVerified: req.session.isCodeVerified,
//       pageType: 'passwordDetail'
//     })
//   } catch (err) {
//     if (err.message.includes('404')) {
//       req.flash('error', 'Lösenordet kunde inte hittas.')
//       return res.redirect('../dashboard')
//     } else if (err.message.includes('401')) {
//       req.flash('error', 'Sessionen har gått ut. Logga in igen.')
//       return res.redirect('../login')
//     }
//     next(err)
//   }
// }

// /**
//  * Updates the password for a specific entry.
//  *
//  * @param {object} req - The request object containing session and body data.
//  * @param {object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  * @returns {Promise<void>} - A promise that resolves when the password is updated.
//  */
// export async function updatePassword (req, res, next) {
//   const token = req.session.user.jwt
//   const id = req.params.id
//   const { password } = req.body

//   try {
//     await changePasswordService(
//       `passwords/${id}`,
//       { password },
//       token
//     )

//     req.flash('success', 'Lösenordet har uppdaterats')
//     return res.redirect(`../../passwords/${id}`)
//   } catch (err) {
//     req.flash('error', err.message)
//     return res.redirect(`./passwords/${id}`)
//   }
// }

// /**
//  * Deletes a password entry by ID.
//  *
//  * @param {object} req - The request object containing session and params data.
//  * @param {object} res - The response object.
//  * @param {Function} next - The next middleware function.
//  * @returns {Promise<void>} - A promise that resolves when the password is deleted.
//  */
// export async function deletePassword (req, res, next) {
//   const token = req.session.user.jwt
//   const { id } = req.params
//   try {
//     await deletePasswordService(`passwords/${id}`, token)
//     req.flash('success', 'Lösenordet har tagits bort')
//     return res.redirect('../../dashboard')
//   } catch (err) {
//     req.flash('error', err.message)
//     return res.redirect(`../../passwords/${id}`)
//   }
// }
