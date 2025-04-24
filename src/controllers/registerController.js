/**
 * Renders the registration page for users.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderRegister = (req, res) => {
  res.render('users/register')
}

/**
 * Handles the form submission for user registration.
 *
 * @param {object} req - The request object containing form data.
 * @param {object} res - The response object used to render views or redirect.
 * @returns {void}
 * @throws {Error} If the request fails or if the response is not JSON.
 */
export const handleFormRegistration = async (req, res) => {
  const { firstName, lastName, email, confirmEmail, password, confirmPassword } = req.body

  if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
    return res.render('users/register', {
      error: 'Alla fält måste fyllas i'
    })
  }

  if (email !== confirmEmail) {
    return res.render('users/register', {
      error: 'E-postadresserna matchar inte'
    })
  }

  if (password !== confirmPassword) {
    return res.render('users/register', {
      error: 'Lösenorden matchar inte'
    })
  }

  try {
    const response = await fetch('http://localhost:4000/api/v1/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    })

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Svar från auth-service är inte JSON')
    }

    const data = await response.json()

    if (!response.ok) {
      return res.render('users/register', {
        error: data.message || 'Registrering misslyckades'
      })
    }

    return res.redirect('/login')
  } catch (err) {
    console.error('Fel vid registrering:', err)
    return res.render('users/register', {
      error: 'Kunde inte kontakta auth-service'
    })
  }
}
