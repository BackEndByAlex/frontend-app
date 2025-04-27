import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import { postToAuthService } from './apiClient.js'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

/**
 * Logs in a user using form credentials.
 *
 * @param {object} credentials - The login credentials.
 * @returns {object} - The session user data.
 */
export async function loginWithForm (credentials) {
  const { token } = await postToAuthService('login', credentials)
  const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

  return { payload, token }
}

/**
 * Authenticates a user via Google ID token.
 *
 * @param {string} idToken - The Google ID token.
 * @returns {object} - The session user data.
 */
export async function authenticateGoogleUser (idToken) {
  const response = await fetch('http://localhost:4000/api/v1/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Auth-service rejected Google token.')
  }

  const { token } = await response.json()
  const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

  return { payload, token }
}

/**
 * Sends a verification code for Google login.
 *
 * @param {string} idToken - The ID token to send.
 * @returns {Promise<void>}
 */
export async function sendVerificationCode (idToken) {
  const response = await fetch('http://localhost:4000/api/v1/send-verification-code/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken })
  })

  if (!response.ok) {
    throw new Error('Kunde inte skicka verifieringskod.')
  }
}

/**
 * Sends a verification code after form login.
 *
 * @param {string} token - JWT token.
 * @returns {Promise<void>}
 */
export async function sendVerificationCodeAfterLogin (token) {
  const response = await fetch('http://localhost:4000/api/v1/send-verification-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Kunde inte skicka verifieringskod efter login.')
  }
}
