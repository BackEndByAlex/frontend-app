import { describe, it, expect, vi } from 'vitest'
import { getResetPassword } from '../../../src/controllers/forgotPassword/getResetPasswordController.js'

describe('getResetPassword controller', () => {
  it('renders the reset password view with token', () => {
    const req = { query: { token: 'abc123' } }
    const res = { render: vi.fn() }

    getResetPassword(req, res)

    expect(res.render).toHaveBeenCalledWith('users/resetPassword', { token: 'abc123' })
  })
})
