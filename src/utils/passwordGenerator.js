/**
 * Generates a strong password containing a mix of lowercase, uppercase, numbers, and symbols.
 *
 * @returns {string} A randomly generated strong password.
 */
export function generateStrongPassword () {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '@#$%^&+=!§()_?'
  const allChars = lowercase + uppercase + numbers + symbols

  let password = ''
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]

  // Resten av lösenordet
  for (let i = 0; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Blanda lösenordet så det inte alltid är samma ordning
  return password.split('').sort(() => Math.random() - 0.5).join('')
}
