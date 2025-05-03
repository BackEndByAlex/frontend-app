import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { router } from '../src/routes/pageRoutes.js'

/**
 * Creates an Express application with a simulated logged-in user.
 *
 * @param {object} userData - The user data to simulate a logged-in user.
 * @param {string} userData.uid - The unique identifier for the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.jwt - The JWT token for the user.
 * @param {string} userData.loginMethod - The login method used by the user (e.g., 'google', 'form').
 * @returns {object} - The configured Express application.
 */
const createAppWithUser = (userData) => {
  const app = express()

  app.set('views', path.join(process.cwd(), 'src', 'views'))
  app.set('view engine', 'ejs')
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(
    session({
      secret: 'test-secret',
      resave: false,
      saveUninitialized: true
    })
  )

  // 💡 Simulera inloggad användare
  app.use((req, res, next) => {
    req.session.user = userData
    next()
  })

  app.use('/', router)

  return app
}

describe('GET /dashboard', () => {
  it('ska visa Google-loginmeddelande för Firebase-användare', async () => {
    const app = createAppWithUser({
      uid: 'firebaseUid123',
      email: 'googleuser@example.com',
      jwt: 'MOCK_JWT',
      loginMethod: 'google'
    })

    const res = await request(app).get('/dashboard')

    expect(res.statusCode).toBe(302)
  })

  it('ska visa formulär-loginmeddelande för vanlig användare', async () => {
    const app = createAppWithUser({
      id: 'mongoId456',
      email: 'formuser@example.com',
      jwt: 'MOCK_JWT',
      loginMethod: 'form'
    })

    const res = await request(app).get('/dashboard')

    expect(res.statusCode).toBe(302)
  })
})
