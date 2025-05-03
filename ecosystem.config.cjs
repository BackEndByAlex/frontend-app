module.exports = {
  apps: [
    {
      name: 'frontend-app',
      script: './src/server.js', 
      env: {
        PORT: 3001,
        NODE_ENV: 'production',
        FIREBASE_API_KEY: 'AIzaSyAI4c1CNcmfYWbYYdlSh6eOEaRDc0uI4rQ',
        FIREBASE_AUTH_DOMAIN: 'passwordmanager-7fc7e.firebaseapp.com',
        FIREBASE_PROJECT_ID: 'passwordmanager-7fc7e',
        FIREBASE_STORAGE_BUCKET: 'passwordmanager-7fc7e.firebasestorage.app',
        FIREBASE_MESSAGING_SENDER_ID: '771892827173',
        FIREBASE_APP_ID: '1:771892827173:web:57d96bde5be644a410dbcc',
        SESSION_SECRET: 'asodj123jASD123@312asd',
        SESSION_NAME: 'PasswordManager'
      }
    }
  ]
}
