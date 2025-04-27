/**
 * Fetches the Firebase configuration from the backend API.
 *
 * @returns {Promise<object>} A promise that resolves to the Firebase configuration object.
 */
export async function getFirebaseConfig () {
  const response = await fetch('http://localhost:4000/api/v1/auth/firebase-config')
  const data = await response.json()
  return data.firebaseConfig
}

/**
 * Verifies a code using the authentication service.
 *
 * @param {string} email - The email address to verify.
 * @param {string} code - The verification code.
 * @param {string} token - The authorization token.
 * @returns {Promise<object>} A promise that resolves to the verification result.
 */
export async function verifyCodeFromAuthService (email, code, token) {
  try {
    const res = await fetch('http://localhost:4000/api/v1/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, code })
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Fel vid verifiering: ${errorText}`)
    }

    return await res.json()
  } catch (error) {
    console.error('[Fel vid verifiering]', error)
    return { success: false, message: 'Något gick fel vid verifiering' }
  }
}

/**
 * Sends a POST request to the auth-service.
 *
 * @param {string} endpoint - The endpoint after /api/v1/ (e.g., 'login' or 'register').
 * @param {object} body - The request body.
 * @returns {Promise<object>} - The response data.
 */
export async function postToAuthService (endpoint, body) {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Svar från auth-service är inte JSON')
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Något gick fel mot auth-service')
    }

    return data
  } catch (error) {
    console.error(`[POST ${endpoint}]`, error)
    throw error
  }
}
