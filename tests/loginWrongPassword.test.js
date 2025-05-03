import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import session from 'express-session'
import path from 'path'
import { router } from '../src/routes/pageRoutes.js'

const app = express()

app.set('views', path.join(process.cwd(), 'src', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'test-secret',
  resave: false,
  saveUninitialized: true
}))

app.use('/', router)

describe('POST /auth/login', () => {
  it('ska visa login-formuläret även vid fel inloggning', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'fel@example.com',
        password: 'fel-lösenord'
      })

    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<form') // så vi vet att sidan laddades
    expect(res.text).toMatch(/Logga\s*in/i) // rubrik
  })
})
