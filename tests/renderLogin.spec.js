import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderLogin } from '../src/controllers/auth/loginController.js'

describe('renderLogin', () => {
  let req
  let res

  beforeEach(() => {
    // Mocka req.csrfToken
    req = {
      csrfToken: vi.fn().mockReturnValue('fake-csrf-token')
    }
    // Mocka res.locals och res.render
    res = {
      locals: {},
      render: vi.fn()
    }
  })

  it('sätter csrfToken på res.locals och anropar res.render med rätt vy', () => {
    renderLogin(req, res)

    // csrfToken ska ha anropats
    expect(req.csrfToken).toHaveBeenCalled()
    // tokenen ska hamna i res.locals.csrfToken
    expect(res.locals.csrfToken).toBe('fake-csrf-token')
    // render ska anropas med rätt vy
    expect(res.render).toHaveBeenCalledWith('users/login')
  })
})
