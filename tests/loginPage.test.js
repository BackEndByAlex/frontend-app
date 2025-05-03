import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'
import path from 'path'
import session from 'express-session'
import { router } from '../src/routes/pageRoutes.js'

const app = express()

app.set('views', path.join(process.cwd(), 'src', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }))

app.use('/', router)

describe('GET /login', () => {
  it('ska returnera statuskod 200 och innehålla login-formulär', async () => {
    const res = await request(app).get('/login')

    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<form')
    expect(res.text).toMatch(/Logga\s*in/i)
  })
})
