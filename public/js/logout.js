import { getFirebaseApp } from './FirebaseClient.js'
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { onDomReady } from './utils.js'

onDomReady(async () => {
  const logoutForm = document.querySelector('#logout-form')
  if (!logoutForm) return

  try {
    const app = await getFirebaseApp()
    const auth = getAuth(app)

    logoutForm.addEventListener('submit', async (e) => {
      e.preventDefault()

      await signOut(auth)

      logoutForm.submit()
    })
  } catch (err) {
    console.error('Logout failed:', err)
  }
})
