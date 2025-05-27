/**
 * Validates the registration form fields.
 *
 * @param {object} formData - The form data to validate.
 * @param {string} formData.firstName - The first name of the user.
 * @param {string} formData.lastName - The last name of the user.
 * @param {string} formData.email - The email address of the user.
 * @param {string} formData.confirmEmail - The confirmation email address.
 * @param {string} formData.password - The password of the user.
 * @param {string} formData.confirmPassword - The confirmation password.
 * @returns {string|null} - Returns an error message if validation fails, otherwise null.
 */
export function validateRegisterForm ({ firstName, lastName, email, confirmEmail, password, confirmPassword }) {
  if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
    return 'Alla fält måste fyllas i'
  }
  if (email !== confirmEmail) {
    return 'E-postadresserna matchar inte'
  }
  if (password !== confirmPassword) {
    return 'Lösenorden matchar inte'
  }

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!§()_?]).{12,}$/
  if (!strongPasswordRegex.test(password)) {
    return 'Lösenordet måste vara minst 12 tecken långt och innehålla minst en liten bokstav, en stor bokstav, en siffra och ett specialtecken.'
  }

  return null
}
