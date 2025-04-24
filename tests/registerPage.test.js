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

describe('GET /register', () => {
  it('ska visa registreringsformulär', async () => {
    const res = await request(app).get('/register')

    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<form')
  })
})
