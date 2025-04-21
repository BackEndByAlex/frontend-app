import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

export const renderRegister = (req, res) => {
  res.render('users/register')
}

export const renderDashboard = (req, res) => {
  const user = req.session?.user
  if (!user) return res.redirect('/login')

  res.render('dashboard/dashboard', { user })
}

export const renderLogin = (req, res) => {
  res.render('users/login')
}

export const getFirebaseConfig = (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  })
}

export const handleGoogleLoginProxy = async (req, res) => {
  try {
    const apiRes = await fetch('http://localhost:4000/api/v1/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })

    if (!apiRes.ok) throw new Error('Auth-service rejected token.')

    const { token } = await apiRes.json()
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    req.session.user = payload
    res.redirect('/dashboard')
  } catch (err) {
    console.error('Proxy login failed:', err)
    res.redirect('/login')
  }
}

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

export const handleFormLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const response = await fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Svar från auth-service är inte JSON')
    }

    const { token } = await response.json()
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

    req.session.user = payload
    res.redirect('/dashboard')
  } catch (err) {
    console.error('Login failed:', err)
    res.render('users/login', {
      error: 'Felaktig e-post eller lösenord'
    })
  }
}
