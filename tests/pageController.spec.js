// tests/pageController.spec.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkSession } from '../src/controllers/page/checkSessionController.js'

describe('checkSession', () => {
  let req, res

  beforeEach(() => {
    // Mocka req med session + flash
    req = {
      session: {},
      flash: vi.fn()
    }
    // Mocka res.status och res.json
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }
  })

  it('returnerar 401 + JSON när ingen user finns i session', () => {
    checkSession(req, res)

    // flash ska ha anropats
    expect(req.flash).toHaveBeenCalledWith('error', 'Session expired')
    // status 401 + rätt json
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Session expired' })
  })

  it('returnerar 200 när user finns i session', () => {
    // Sätt en user i session
    req.session.user = { id: 'u1', name: 'Test' }

    checkSession(req, res)

    // flash anropas även här (enligt din kod)
    expect(req.flash).toHaveBeenCalledWith('error', 'Session expired')
    // bara status 200 (ingen json i din implementation)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).not.toHaveBeenCalled()
  })
})
