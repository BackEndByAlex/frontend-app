import { describe, it, expect, vi } from 'vitest'
import { handleFormLogin } from '../../../src/controllers/auth/formLoginController.js'
import * as loginService from '../../../src/services/auth/loginWithForm.js'
import * as sendCodeService from '../../../src/services/auth/sendVerificationCodeAfterLogin.js'

vi.mock('../../../src/services/auth/loginWithForm.js')
vi.mock('../../../src/services/auth/sendVerificationCodeAfterLogin.js')

describe('handleFormLogin', () => {
  it('redirects to dashboard on success', async () => {
    const req = {
      session: {},
      body: { email: 'a@b.com', password: 'pass' },
      flash: vi.fn()
    }
    const res = {
      status: vi.fn(() => res),
      redirect: vi.fn()
    }
    loginService.loginWithForm.mockResolvedValue({ payload: { id: 1 }, token: 'tok' })
    sendCodeService.sendVerificationCodeAfterLogin.mockResolvedValue()

    await handleFormLogin(req, res)

    expect(req.session.user).toEqual({ id: 1, jwt: 'tok' })
    expect(req.session.isCodeVerified).toBe(false)
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('../dashboard')
  })

  it('redirects to login on error', async () => {
    const req = { session: {}, body: {}, flash: vi.fn() }
    const res = {
      status: vi.fn(() => res),
      redirect: vi.fn()
    }
    loginService.loginWithForm.mockRejectedValue(new Error('fail'))

    await handleFormLogin(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.redirect).toHaveBeenCalledWith('../login')
  })
})
