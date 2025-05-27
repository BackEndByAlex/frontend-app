import leoprofanity from 'leo-profanity'

// Ladda både engelska och svenska
leoprofanity.loadDictionary('en')
leoprofanity.loadDictionary('sv')

/**
 * Returnerar true om texten innehåller otillåtna ord.
 *
 * @param {string} text - Texten som ska kontrolleras.
 * @returns {boolean} True om texten innehåller otillåtna ord, annars false.
 */
export function containsProfanity (text) {
  return leoprofanity.check(text)
}

/**
 * Maskerar alla otillåtna ord med stjärnor.
 *
 * @param {string} text - Texten som ska maskeras.
 * @returns {string} Texten med otillåtna ord maskerade.
 */
export function cleanProfanity (text) {
  return leoprofanity.clean(text)
}

/**
 * Express-middleware som blockerar om det finns svordomar.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {void}
 */
export function profanityFilter (req, res, next) {
  const text = req.body.message || ''

  if (containsProfanity(text)) {
    req.flash('error', 'Ditt meddelande innehåller otillåtna ord.')
    return res.redirect('../../')
  }

  next()
}
