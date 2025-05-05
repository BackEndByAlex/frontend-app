import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { fetchFirebaseConfig } from './api.js'
import { onDomReady } from './utils.js'

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

      const csrfToken = document.getElementById('csrfToken')?.value || ''

      const proxyResponse = await fetch('./google/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify({ idToken })
      })

      if (!proxyResponse.ok) throw new Error('Proxy-login misslyckades')

      window.location.href = './dashboard'
    } catch (err) {
      console.error('[GOOGLE LOGIN ERROR]', err)
      alert('Google-login misslyckades!')
    }
  })
}

onDomReady(main)