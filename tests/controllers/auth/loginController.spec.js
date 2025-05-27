import { describe, it, expect, vi } from 'vitest'
import { renderLogin } from '../../../src/controllers/auth/loginController.js'

describe('renderLogin', () => {
  it('sets csrfToken and renders view', () => {
    const req =
      {
        /**
         * Mock csrfToken function.
         *
         * @returns {string} The CSRF token string.
         */
        csrfToken: () => 'tok123'
      }

    /**
     * Mock response object with locals and a render function.
     */
    const res = { locals: {}, render: vi.fn() }

    renderLogin(req, res)

    expect(res.locals.csrfToken).toBe('tok123')
    expect(res.render).toHaveBeenCalledWith('users/login')
  })
})
