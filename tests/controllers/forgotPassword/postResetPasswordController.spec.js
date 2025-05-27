import { describe, it, expect, vi, beforeEach } from 'vitest'
import { postResetPassword } from '../../../src/controllers/forgotPassword/postResetPasswordController.js'
import * as authService from '../../../src/services/auth/postToAuthService.js'

vi.mock('../../../src/services/auth/postToAuthService.js')

describe('postResetPassword controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects back when passwords do not match', async () => {
    const req = { body: { token: 'tkn', password: 'a', confirm: 'b' }, flash: vi.fn() }
    const res = { redirect: vi.fn() }

    await postResetPassword(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'Lösenorden matchar inte')
    expect(res.redirect).toHaveBeenCalledWith('./reset-password?token=tkn')
  })

  it('redirects to login with 302 and flashes success on valid reset', async () => {
    const req = { body: { token: 'tkn', password: 'a', confirm: 'a' }, flash: vi.fn() }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    authService.postToAuthService.mockResolvedValue()

    await postResetPassword(req, res)

    expect(authService.postToAuthService).toHaveBeenCalledWith('reset-password', {
      token: 'tkn',
      password: 'a'
    })
    expect(req.flash).toHaveBeenCalledWith(
      'success',
      'Ditt lösenord är uppdaterat. Du kan logga in igen.'
    )
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('./login')
  })

  it('redirects back with 400 and flashes service error on failure', async () => {
    const req = { body: { token: 'tkn', password: 'a', confirm: 'a' }, flash: vi.fn() }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }
    const err = new Error('service down')

    authService.postToAuthService.mockRejectedValue(err)

    await postResetPassword(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'service down')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('./reset-password?token=tkn')
  })
})
