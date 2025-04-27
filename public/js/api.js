/**
 * Fetches the Firebase configuration from the server.
 *
 * @returns {Promise<object>} A promise that resolves to the Firebase configuration object.
 */
export async function fetchFirebaseConfig () {
  const res = await fetch('/firebase-config')

  if (!res.ok) {
    throw new Error('Kunde inte hämta Firebase config')
  }

  return await res.json()
}
