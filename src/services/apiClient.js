export async function getFirebaseConfig () {
  const response = await fetch('http://localhost:4000/api/v1/auth/firebase-config')
  const data = await response.json()
  return data.firebaseConfig
}
