/**
 * @file This module contains the options object for the session middleware.
 * @module config/sessionOptions
 * @author Mats Loock
 * @version 1.0.0
 * @see {@link https://github.com/expressjs/session}
 */

import dotenv from 'dotenv'

dotenv.config()

// Options object for the session middleware.
export const sessionOptions = {
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 15, // 15 minutes 1000 * 60 * 15
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Ändra till 'strict' om man vill ha striktare säkerhet.
    secure: process.env.NODE_ENV === 'production' // Set to true if using https
  }
}

// Ändra secure till true när du kör i produktion och har HTTPS aktiverat, samt
// sätt NODE_ENV till 'production' i miljövariabel för att aktivera det när
// du kör i produktion.
// Om man kör i utvecklingsläge (localhost) kan
// man sätta secure till false för att undvika problem med cookies.
