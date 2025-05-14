// import { postToAuthService } from './auth/postToAuthService.js'
// import { logger } from '../config/winston.js'

// /**
//  * Registers a new user by sending their details to the authentication service.
//  *
//  * @param {object} user - The user details.
//  * @param {string} user.firstName - The first name of the user.
//  * @param {string} user.lastName - The last name of the user.
//  * @param {string} user.email - The email address of the user.
//  * @param {string} user.password - The password for the user.
//  * @returns {Promise<object>} The response from the authentication service.
//  */
// export async function registerUser ({ firstName, lastName, email, password }) {
//   try {
//     return await postToAuthService('register', { firstName, lastName, email, password })
//   } catch (error) {
//     logger.error('[REGISTER SERVICE ERROR]', { error })

//     if (error.message) {
//       throw new Error(error.message)
//     } else {
//       throw new Error('Kunde inte registrera användare. Försök igen senare.')
//     }
//   }
// }
