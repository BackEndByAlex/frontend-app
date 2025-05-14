import fs from 'fs'

export const AUTH_URL = process.env.AUTH_URL
export const PASSWORD_URL = process.env.PASSWORD_URL
export const publicKey = fs.readFileSync('./public.pem')
