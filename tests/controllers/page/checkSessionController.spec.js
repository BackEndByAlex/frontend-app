import { describe, it, expect, vi } from 'vitest'
import { checkSession } from '../../../src/controllers/page/checkSessionController.js'

describe('checkSession controller', () => {
  it('returns 401 when no session', () => {
    const req = { session: {}, flash: vi.fn() }
    const res = { status: vi.fn(() => res), json: vi.fn() }

    checkSession(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'Session expired')
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Session expired' })
  })

  it('returns 200 when session exists', () => {
    const req = { session: { user: {} }, flash: vi.fn() }
    const res = { status: vi.fn(() => res) }

    checkSession(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
  })
})
