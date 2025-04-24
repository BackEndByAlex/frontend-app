import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'

/**
 * Fetches the Firebase configuration and initializes the Firebase app.
 *
 * @returns {Promise<object>} The initialized Firebase app instance.
 */
export async function getFirebaseApp () {
  const res = await fetch('/firebase-config')
  const firebaseConfig = await res.json()

  return getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
}
