import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

export const renderRegister = (req, res) => {
  res.render('users/register')
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

export const renderDashboard = (req, res) => {
  const user = req.session?.user
  if (!user) return res.redirect('/login')

  res.render('dashboard/dashboard', { user })
}

export const renderLogin = (req, res) => {
  res.render('users/login')
}
