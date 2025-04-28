/**
 * @file The starting point of the frontend application.
 * @module src/server
 * @author Alexandru Antonescu
 * @version 1.0.0
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import dotenv from 'dotenv'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
import session from 'express-session'
import { router as routes } from './routes/pageRoutes.js'
import { sessionOptions } from './config/sessionOptions.js'
import rateLimit from 'express-rate-limit'
import flash from 'express-flash'
import csurf from 'csurf'

dotenv.config()

try {
  // Get the path of the current module's directory.
  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  // Set the base URL to use for all relative URLs in a document.
  const baseURL = process.env.BASE_URL || '/'

  // Create Express application.
  const app = express()

  // 1. Security headers
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          'https://www.gstatic.com', // <-- lägg till denna!
          'https://www.googleapis.com'
        ],
        styleSrc: ["'self'", 'https:'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: [
          "'self'",
          'https://www.gstatic.com',
          'https://securetoken.googleapis.com',
          'https://identitytoolkit.googleapis.com'
        ],
        frameSrc: ["'self'"]
      }
    })
  )

  // log requests to the console.
  app.use(logger('dev'))

  // 2. Body parsing BEFORE csrf!
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // 3. Session setup
  app.use(session(sessionOptions))

  // 4. Flash messages
  app.use(flash())

  // 5. Flash messages available to views
  app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success')
    res.locals.errorMessages = req.flash('error')
    res.locals.codeVerifiedMessages = req.flash('code-verified')
    next()
  })

  // 6. CSRF protection, skip API and Google login
  const csrfProtection = csurf({ cookie: false })
  app.use((req, res, next) => {
    if (
      req.path.startsWith('/api/') ||
      req.path.startsWith('/auth/google') ||
      req.path.startsWith('/firebase-config') ||
      req.path === '/favicon.ico'
    ) {
      return next()
    }
    csrfProtection(req, res, next)
  })

  // 7. Attach csrfToken to all views
  app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken ? req.csrfToken() : null
    next()
  })

  // 8. Static files
  app.use(express.static(join(directoryFullName, '..', 'public')))

  // 9. Rate limiter BEFORE routes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuter
    max: 100, // max 100 requests per 15 min
    message: 'För många förfrågningar från denna IP, försök igen senare.'
  })
  app.use(limiter)

  // 10. View engine and layouts
  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
  app.set('layout extractScripts', true)
  app.set('layout extractStyles', true)
  app.use(expressLayouts)

  // 11. Middleware to pass base URL to views
  app.use((req, res, next) => {
    res.locals.baseURL = baseURL
    next()
  })

  // 12. Register routes
  app.use('/', routes)

  // 13. Error handler
  app.use((err, req, res, next) => {
    console.error(err)
    res
      .status(err.status || 500)
      .send(err.message || 'Internal Server Error')
  })

  // Start the server.
  const server = app.listen(process.env.PORT, () => {
    console.log(`Frontend running at http://localhost:${server.address().port}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (error) {
  console.error('Error starting the server:', error)
  process.exit(1) // Exit the process with a failure code
}
