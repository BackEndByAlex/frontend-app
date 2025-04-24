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
