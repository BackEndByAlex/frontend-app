import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

/**
 * Middleware to ensure the user is authenticated.
 * Redirects to the login page if the JWT token is missing or invalid.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const requireAuth = (req, res, next) => {
  const token = req.session?.user?.jwt

  if (!token) {
    return res.redirect('/login')
  }

  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    req.user = payload
    next()
  } catch (err) {
    console.error('Token verification failed:', err)
    return res.redirect('/login')
  }
}
