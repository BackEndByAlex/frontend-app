import { describe, it, expect, vi } from 'vitest'
import { logout } from '../../../src/controllers/auth/logoutController.js'

describe('logout', () => {
  it('destroys session and redirects on success', () => {
    const req = { session: { destroy: vi.fn(cb => cb()) } }
    const res = {
      clearCookie: vi.fn(),
      status: vi.fn(() => res),
      redirect: vi.fn()
    }

    logout(req, res)

    expect(req.session.destroy).toHaveBeenCalled()
    expect(res.clearCookie).toHaveBeenCalledWith('connect.sid')
    expect(res.redirect).toHaveBeenCalledWith('./')
  })

  it('returns 500 on destroy error', () => {
    const error = new Error('fail')
    const req = { session: { destroy: vi.fn(cb => cb(error)) } }
    const res = { status: vi.fn(() => res), json: vi.fn() }

    logout(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout failed' })
  })
})
