import { describe, it, expect, vi, beforeEach } from 'vitest'
import { postForgotPassword } from '../../../src/controllers/forgotPassword/postForgotPasswordController.js'
import * as authService from '../../../src/services/auth/postToAuthService.js'
import { logger } from '../../../src/config/winston.js'

vi.mock('../../../src/services/auth/postToAuthService.js')
vi.mock('../../../src/config/winston.js', () => ({ logger: { error: vi.fn() } }))

describe('postForgotPassword controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects with 302 and flashes info on success', async () => {
    const req = { body: { email: 'x@y.com' }, flash: vi.fn() }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    authService.postToAuthService.mockResolvedValue()

    await postForgotPassword(req, res)

    expect(req.flash).toHaveBeenCalledWith(
      'info',
      'Om e-postadressen finns skickas en återställningslänk.'
    )
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('./forgot-password')
  })

  it('redirects with 400 and flashes error on failure', async () => {
    const req = { body: { email: 'x@y.com' }, flash: vi.fn() }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }
    const err = new Error('boom')

    authService.postToAuthService.mockRejectedValue(err)

    await postForgotPassword(req, res)

    expect(logger.error).toHaveBeenCalledWith('[POST FORGOT PASSWORD ERROR]', err)
    expect(req.flash).toHaveBeenCalledWith('error', 'Kunde inte skicka återställningslänken.')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('../forgot-password')
  })
})
