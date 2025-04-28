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

      // Hämta CSRF-token från DOM
      const csrfToken = document.getElementById('csrfToken')?.value || ''

      // Skapa ett dolt formulär och posta till servern!
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = '/auth/google'

      const idTokenInput = document.createElement('input')
      idTokenInput.type = 'hidden'
      idTokenInput.name = 'idToken'
      idTokenInput.value = idToken

      const csrfInput = document.createElement('input')
      csrfInput.type = 'hidden'
      csrfInput.name = '_csrf'
      csrfInput.value = csrfToken

      form.appendChild(idTokenInput)
      form.appendChild(csrfInput)
      document.body.appendChild(form)
      form.submit() // Skickar till servern som POST
    } catch (err) {
      alert('Login misslyckades!')
    }
  })
}

onDomReady(main)
