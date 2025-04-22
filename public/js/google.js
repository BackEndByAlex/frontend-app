import { getFirebaseApp } from './FirebaseClient.js'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'

async function main() {
  const app = await getFirebaseApp()
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
