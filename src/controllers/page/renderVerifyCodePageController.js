/**
 * Renders the verify code page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderVerifyCodePage = (req, res) => {
  res.render('verify-code', {
    title: 'Verifiera din kod',
    csrfToken: req.csrfToken()
  })
}
