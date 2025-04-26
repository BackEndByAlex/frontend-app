import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

/**
 * Renders the login page for the user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderLogin = (req, res) => {
  res.render('users/login')
}

/**
 * Logs out the user by destroying the session and redirects to the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

/**
 * Handles form-based login by sending credentials to the auth-service,
 * verifying the token, saving user data in the session, and sending a verification code.
 *
 * @param {object} req - The request object containing the login credentials in the body.
 * @param {object} res - The response object used to render views or redirect.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const handleFormLogin = async (req, res) => {
  try {
    // 1. Skicka login-data till auth-service
    const apiRes = await fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })

    if (!apiRes.ok) {
      return res.render('users/login', {
        error: 'Fel e-post eller lösenord.'
      })
    }

    const { token } = await apiRes.json()
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    // 2. Spara i session
    req.session.user = {
      ...payload,
      jwt: token
    }

    // 3. Försök skicka verifieringskod via auth-service
    const codeRes = await fetch('http://localhost:4000/api/v1/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!codeRes.ok) {
      req.session.destroy(() => {
        return res.render('users/login', {
          error: 'Din Gmail-adress kunde inte verifieras. Vänligen använd en riktig Gmail.'
        })
      })
    }

    // 4. Allt gick bra → vidare till dashboard
    res.redirect('/dashboard')
  } catch (err) {
    console.error('[LOGIN] Fel vid inloggning:', err)
    res.render('users/login', {
      error: 'Något gick fel. Försök igen senare.'
    })
  }
}

/**
 * Authenticates a Google user by sending the ID token to the auth-service
 * and verifying the returned JWT.
 *
 * @param {string} idToken - The ID token from Google.
 * @returns {Promise<{token: string, payload: object}>} - The verified JWT and its payload.
 * @throws {Error} - If the auth-service rejects the token.
 */
async function authenticateGoogleUser (idToken) {
  const response = await fetch('http://localhost:4000/api/v1/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
    credentials: 'include'
  })

  if (!response.ok) throw new Error('Auth-service rejected token.')

  const { token } = await response.json()
  const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

  return { token, payload }
}

/**
 * Stores user information in the session.
 *
 * @param {object} req - The request object.
 * @param {object} payload - The payload containing user data.
 * @param {string} token - The JWT token.
 */
function storeUserSession (req, payload, token) {
  req.session.user = {
    ...payload,
    jwt: token
  }
}

/**
 * Sends a verification code to the user and redirects to the dashboard.
 *
 * @param {object} req - The request object containing the ID token in the body.
 * @param {object} res - The response object used to redirect.
 */
async function sendVerificationCodeAndRedirect (req, res) {
  await fetch('http://localhost:4000/api/v1/send-verification-code/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: req.body.idToken })
  })

  res.redirect('/dashboard')
}

/**
 * Handles Google login by authenticating the user, storing session data,
 * and sending a verification code before redirecting to the dashboard.
 *
 * @param {object} req - The request object containing the ID token in the body.
 * @param {object} res - The response object used to redirect or render views.
 */
export const handleGoogleLoginProxy = async (req, res) => {
  try {
    const { token, payload } = await authenticateGoogleUser(req.body.idToken)
    storeUserSession(req, payload, token)
    await sendVerificationCodeAndRedirect(req, res)
  } catch (err) {
    console.error('Proxy login failed:', err)
    res.redirect('/login')
  }
}
