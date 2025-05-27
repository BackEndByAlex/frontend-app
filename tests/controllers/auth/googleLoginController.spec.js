import { describe, it, expect, vi } from 'vitest'
import { handleGoogleLoginProxy } from '../../../src/controllers/auth/googleLoginController.js'
import * as authService from '../../../src/services/auth/authenticateGoogleUser.js'
import * as sendCode from '../../../src/services/auth/sendVerificationCode.js'

vi.mock('../../../src/services/auth/authenticateGoogleUser.js')
vi.mock('../../../src/services/auth/sendVerificationCode.js')

describe('handleGoogleLoginProxy', () => {
  it('returns 200 and session created on success', async () => {
    const req = {
      body: { idToken: 'id' },
      session: {},
      flash: vi.fn()
    }
    const res = {
      status: vi.fn(() => res),
      json: vi.fn()
    }
    authService.authenticateGoogleUser.mockResolvedValue({ payload: { id: 2 }, token: 'tok2' })
    sendCode.sendVerificationCode.mockResolvedValue()

    await handleGoogleLoginProxy(req, res)

    expect(req.session.user).toEqual({ id: 2, jwt: 'tok2' })
    expect(req.session.isCodeVerified).toBe(false)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: 'Session created' })
  })

  it('returns 403 on error', async () => {
    const req = { body: { idToken: 'id' }, session: {}, flash: vi.fn() }
    const res = { status: vi.fn(() => res), json: vi.fn() }
    authService.authenticateGoogleUser.mockRejectedValue(new Error('fail'))

    await handleGoogleLoginProxy(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({ error: 'Google-login misslyckades' })
  })
})
