import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

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
