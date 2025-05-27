import { describe, it, expect, vi } from 'vitest'
import { getForgotPassword } from '../../../src/controllers/forgotPassword/getForgotPasswordController.js'

describe('getForgotPassword controller', () => {
  it('renders the forgot password view', () => {
    const req = {}
    const res = { render: vi.fn() }

    getForgotPassword(req, res)

    expect(res.render).toHaveBeenCalledWith('users/forgotPassword')
  })
})
