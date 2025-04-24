import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'

/**
 * Fetches the Firebase configuration from the server.
 *
 * @returns {Promise<object>} A promise that resolves to the Firebase configuration object.
 */
async function getFirebaseConfig () {
  const res = await fetch('/firebase-config')
  return await res.json()
}

/**
 * Initializes the Firebase app and sets up Google login functionality.
 */
async function main () {
  const firebaseConfig = await getFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  document.querySelector('#google-login')?.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      const res = await fetch('/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      })

      if (!res.ok) throw new Error('Login misslyckades')
      window.location.href = '/dashboard'
    } catch (err) {
      alert('Login misslyckades!')
    }
  })
}

main()
