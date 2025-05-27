import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { fetchFirebaseConfig } from './api.js'

/**
 * Fetches the Firebase configuration and initializes the Firebase app.
 *
 * @returns {Promise<object>} The initialized Firebase app instance.
 */
export async function getFirebaseApp () {
  const firebaseConfig = await fetchFirebaseConfig()

  return getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
}
