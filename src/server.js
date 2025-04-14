/**
 * @file The starting point of the frontend application.
 * @module src/server
 * @author Alexandru Antonescu
 * @version 1.0.0
 */

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router as routes } from './routes/pageRoutes.js'
import 'dotenv/config'

// Get the path of the current module's directory.
const directoryFullName = dirname(fileURLToPath(import.meta.url))

// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// Create Express application.
const app = express()

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// View engine setup.
app.set('view engine', 'ejs')
app.set('views', join(directoryFullName, 'views'))
app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
app.set('layout extractScripts', true)
app.set('layout extractStyles', true)
app.use(expressLayouts)

// Parse application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: false }))

// Serve static files.
app.use(express.static(join(directoryFullName, '..', 'public')))

// Middleware to pass base URL to views.
app.use((req, res, next) => {
  res.locals.baseURL = baseURL
  next()
})

// Register routes.
app.use('/', routes)

// Error handler.
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
