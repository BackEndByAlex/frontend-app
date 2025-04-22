import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'

export async function getFirebaseApp() {
  const res = await fetch('/firebase-config')
  const firebaseConfig = await res.json()

  return getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
}
