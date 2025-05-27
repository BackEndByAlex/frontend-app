import { verifyCodeFromAuthService } from '../../services/auth/verifyCodeFromAuthService.js'

const MAX_ATTEMPTS = 5

/**
 * Handles the verification of a code submitted by the user.
 *
 * @param {object} req - The request object containing user session and body data.
 * @param {object} res - The response object used to redirect or send responses.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const postVerifyCode = async (req, res) => {
  const { code } = req.body
  const token = req.session.user?.jwt
  const email = req.session.user?.email

  // Initiera räknare om den saknas
  const attempts = req.session.codeAttempts ?? 0

  // Kontrollera om max antal försök redan överskridits
  if (attempts >= MAX_ATTEMPTS) {
    req.flash('error', 'För många försök. Försök igen senare.')
    return res.status(429).redirect('./dashboard')
  }

  try {
    // Försök verifiera koden mot autentiseringstjänsten
    await verifyCodeFromAuthService(email, code, token)

    // Vid lyckad verifiering:
    req.session.isCodeVerified = true
    // Nollställ räknaren
    req.session.codeAttempts = 0
    req.flash('success', 'Koden har verifierats!')
    return res.redirect('./dashboard')
  } catch (err) {
    // Inkrementera felräknaren
    req.session.codeAttempts = attempts + 1

    // Om detta var sista tillåtna försöket
    if (req.session.codeAttempts >= MAX_ATTEMPTS) {
      req.flash('error', 'För många försök. Försök igen senare.')
    } else {
      // Annars visa det normala felmeddelandet
      const msg = err.message || 'Fel vid verifiering.'
      req.flash('error', msg)
    }

    // Markera kod som ej verifierad
    req.session.isCodeVerified = false
    return res.status(400).redirect('./dashboard')
  }
}
