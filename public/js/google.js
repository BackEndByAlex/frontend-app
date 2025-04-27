import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { fetchFirebaseConfig } from './api.js'
import { onDomReady, postJson } from './utils.js'

/**
 * Initializes the Firebase app and sets up Google login functionality.
 */
async function main () {
  const firebaseConfig = await fetchFirebaseConfig()
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const googleLoginBtn = document.querySelector('#google-login')
  if (!googleLoginBtn) return

  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      const res = await postJson('/auth/google', { idToken })

      if (!res.ok) throw new Error('Login misslyckades')
      window.location.href = '/dashboard'
    } catch (err) {
      alert('Login misslyckades!')
    }
  })
}

// Kör först när DOM är laddad
onDomReady(main)
