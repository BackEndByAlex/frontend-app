import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { fetchFirebaseConfig } from './api.js'
import { onDomReady } from './utils.js'

/**
 * Main function to initialize Firebase and set up Google login.
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

      // Skapa ett dolt formulär och posta till servern!
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = '/auth/google'

      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'idToken'
      input.value = idToken

      form.appendChild(input)
      document.body.appendChild(form)
      form.submit() // Skickar till servern som POST
    } catch (err) {
      alert('Login misslyckades!')
    }
  })
}

onDomReady(main)
