import { describe, it, expect, vi, beforeEach } from 'vitest'
import { savePassword } from '../../../src/controllers/password/savePasswordController.js'
import * as service from '../../../src/services/password/postToPasswordService.js'
import { logger } from '../../../src/config/winston.js'

vi.mock('../../../src/services/password/postToPasswordService.js')
vi.mock('../../../src/config/winston.js', () => ({ logger: { error: vi.fn() } }))

describe('savePassword controller', () => {
  beforeEach(() => vi.clearAllMocks())

  it('redirects if not verified', async () => {
    const req = { session: {}, flash: vi.fn() }
    const res = { redirect: vi.fn() }

    await savePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Du måste vara verifierad för att spara lösenord.')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('redirects 400 if missing fields', async () => {
    const req = {
      session: { user: {}, isCodeVerified: true },
      body: { service: '', username: '', password: '' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await savePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Alla fält måste fyllas i.')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('saves and redirects on success', async () => {
    const req = {
      session: { user: { jwt: 'tok' }, isCodeVerified: true },
      body: { service: 'A', username: 'u', password: 'p' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }
    service.postToPasswordService.mockResolvedValue()

    await savePassword(req, res)
    expect(service.postToPasswordService).toHaveBeenCalledWith(
      'passwords',
      { service: 'A', username: 'u', password: 'p' },
      'tok'
    )
    expect(req.flash).toHaveBeenCalledWith('success', 'Lösenord sparat!')
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('handles service error', async () => {
    const error = new Error('fail')
    const req = {
      session: { user: { jwt: 'tok' }, isCodeVerified: true },
      body: { service: 'A', username: 'u', password: 'p' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }
    service.postToPasswordService.mockRejectedValue(error)

    await savePassword(req, res)
    expect(logger.error).toHaveBeenCalledWith('[SAVE PASSWORD ERROR]', { error })
    expect(req.flash).toHaveBeenCalledWith('error', 'Kunde inte spara lösenord.')
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })
})
