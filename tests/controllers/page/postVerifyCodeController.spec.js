import { describe, it, expect, vi, beforeEach } from 'vitest'
import { postVerifyCode } from '../../../src/controllers/page/postVerifyCodeController.js'
import * as service from '../../../src/services/auth/verifyCodeFromAuthService.js'

vi.mock('../../../src/services/auth/verifyCodeFromAuthService.js')

describe('postVerifyCode controller', () => {
  beforeEach(() => vi.clearAllMocks())

  it('blocks when attempts exceeded', async () => {
    const req = {
      body: { code: '123' },
      session: { codeAttempts: 5, user: { jwt: 't', email: 'a@b' } },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await postVerifyCode(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'För många försök. Försök igen senare.')
    expect(res.status).toHaveBeenCalledWith(429)
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('verifies code and redirects on success', async () => {
    service.verifyCodeFromAuthService.mockResolvedValue()
    const req = {
      body: { code: '123' },
      session: { codeAttempts: 0, user: { jwt: 't', email: 'a@b' } },
      flash: vi.fn()
    }
    const res = { redirect: vi.fn() }

    await postVerifyCode(req, res)

    expect(req.session.isCodeVerified).toBe(true)
    expect(req.session.codeAttempts).toBe(0)
    expect(req.flash).toHaveBeenCalledWith('success', 'Koden har verifierats!')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('increments attempts and handles error', async () => {
    service.verifyCodeFromAuthService.mockRejectedValue(new Error('no'))
    const req = {
      body: { code: '123' },
      session: { codeAttempts: 2, user: { jwt: 't', email: 'a@b' } },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await postVerifyCode(req, res)

    expect(req.session.codeAttempts).toBe(3)
    expect(req.session.isCodeVerified).toBe(false)
    expect(req.flash).toHaveBeenCalledWith('error', 'no')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })
})
