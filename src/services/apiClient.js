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

export async function verifyCodeFromAuthService(email, code, token) {
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
