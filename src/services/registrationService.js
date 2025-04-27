import { postToAuthService } from './apiClient.js'

/**
 * Registers a new user by sending their details to the authentication service.
 *
 * @param {object} user - The user details.
 * @param {string} user.firstName - The first name of the user.
 * @param {string} user.lastName - The last name of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.password - The password for the user.
 * @returns {Promise<object>} The response from the authentication service.
 */
export async function registerUser ({ firstName, lastName, email, password }) {
  return await postToAuthService('register', { firstName, lastName, email, password })
}
