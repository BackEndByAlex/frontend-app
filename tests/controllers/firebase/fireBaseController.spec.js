import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFirebaseConfig } from '../../../src/controllers/firebase/getFirebaseConfigController.js'
describe('getFirebaseConfig', () => {
  let req, res

  beforeEach(() => {
    // Sätt upp dummy-env
    process.env.FIREBASE_API_KEY = 'APIKEY'
    process.env.FIREBASE_AUTH_DOMAIN = 'example.firebaseapp.com'
    process.env.FIREBASE_PROJECT_ID = 'my-project'
    process.env.FIREBASE_STORAGE_BUCKET = 'bucket.appspot.com'
    process.env.FIREBASE_MESSAGING_SENDER_ID = '12345'
    process.env.FIREBASE_APP_ID = '1:12345:web:abcdef'

    req = {}
    res = { json: vi.fn() }
  })

  it('svarar med rätt firebase-konfiguration', () => {
    getFirebaseConfig(req, res)
    expect(res.json).toHaveBeenCalledWith({
      apiKey: 'APIKEY',
      authDomain: 'example.firebaseapp.com',
      projectId: 'my-project',
      storageBucket: 'bucket.appspot.com',
      messagingSenderId: '12345',
      appId: '1:12345:web:abcdef'
    })
  })
})
