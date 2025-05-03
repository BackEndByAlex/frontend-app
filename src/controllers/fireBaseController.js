/**
 * Retrieves Firebase configuration from environment variables and sends it as a JSON response.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const getFirebaseConfig = (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  })
}
