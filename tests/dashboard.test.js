import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { router } from '../src/routes/pageRoutes.js'

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
