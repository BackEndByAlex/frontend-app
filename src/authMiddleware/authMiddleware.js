import jwt from 'jsonwebtoken'
import fs from 'fs'

const publicKey = fs.readFileSync('./public.pem')

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.redirect('/login')
  }

  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    req.user = payload
    next()
  } catch (err) {
    return res.redirect('/login')
  }
}
