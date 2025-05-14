// import fetch from 'node-fetch'
// import jwt from 'jsonwebtoken'
// import { postToAuthService } from './apiClient.js'
// import { logger } from '../config/winston.js'
// import fs from 'fs'

// const publicKey = fs.readFileSync('./public.pem')
// const AUTH_URL = process.env.AUTH_URL

// /**
//  * Logs in a user using form credentials.
//  *
//  * @param {object} credentials - The login credentials.
//  * @returns {object} - The session user data.
//  */
// export async function loginWithForm (credentials) {
//   try {
//     const { token } = await postToAuthService('login', credentials)
//     const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
//     return { payload, token }
//   } catch (error) {
//     logger.error('[LOGIN SERVICE ERROR]', { error })
//     throw new Error('Fel vid inloggning. Försök igen.')
//   }
// }

// /**
//  * Authenticates a user via Google ID token.
//  *
//  * @param {string} idToken - The Google ID token.x
//  * @returns {object} - The session user data.
//  */
// export async function authenticateGoogleUser (idToken) {
//   try {
//     const response = await fetch(`${AUTH_URL}/google`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ idToken }),
//       credentials: 'include'
//     })

//     if (!response.ok) {
//       throw new Error('Auth-service rejected Google token.')
//     }

//     const { token } = await response.json()
//     const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })

//     return { payload, token }
//   } catch (error) {
//     logger.error('[GOOGLE AUTH SERVICE ERROR]', { error })
//     throw new Error('Google-inloggning misslyckades. Försök igen.')
//   }
// }

// /**
//  * Sends a verification code for Google login.
//  *
//  * @param {string} idToken - The ID token to send.
//  * @returns {Promise<void>}
//  */
// export async function sendVerificationCode (idToken) {
//   try {
//     const response = await fetch(`${AUTH_URL}/send-verification-code/google`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ idToken })
//     })

//     if (!response.ok) {
//       throw new Error('Kunde inte skicka verifieringskod via Google.')
//     }
//   } catch (error) {
//     logger.error('[SEND VERIFICATION CODE GOOGLE ERROR]', { error })
//     throw error
//   }
// }

// /**
//  * Sends a verification code after form login.
//  *
//  * @param {string} token - JWT token.
//  * @returns {Promise<void>}
//  */
// export async function sendVerificationCodeAfterLogin (token) {
//   try {
//     const response = await fetch(`${AUTH_URL}/send-verification-code`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       }
//     })

//     const responseBody = await response.text() // läs svaret som text för debug

//     if (!response.ok) {
//       logger.error('[SEND VERIFICATION CODE ERROR]')
//       logger.error('Status:', response.status)
//       logger.error('Response body:', responseBody)
//       throw new Error('Kunde inte skicka verifieringskod efter login.')
//     }
//   } catch (error) {
//     logger.error('[SEND VERIFICATION CODE LOGIN ERROR]', { error })
//     throw error
//   }
// }
