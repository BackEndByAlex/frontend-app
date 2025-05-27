import { describe, it, expect, vi } from 'vitest'
import { renderPasswordDetail } from '../../../src/controllers/password/renderPasswordDetailController.js'
import * as service from '../../../src/services/password/getFromPasswordService.js'

vi.mock('../../../src/services/password/getFromPasswordService.js')

describe('renderPasswordDetail controller', () => {
  /**
   * Creates mock request, response, and next function objects for testing.
   *
   * @returns {{ req: object, res: object, next: Function }} Mocked req, res, and next.
   */
  const makeReqRes = () => {
    const req = {
      session: { user: { jwt: 'tok' }, isCodeVerified: true },
      params: { id: '123' },
      /**
       * Mock CSRF token generator.
       *
       * @returns {string} A mock CSRF token.
       */
      csrfToken: () => 'csrf123',
      flash: vi.fn()
    }
    const res = {
      render: vi.fn(),
      status: vi.fn(() => res),
      redirect: vi.fn()
    }
    const next = vi.fn()
    return { req, res, next }
  }

  it('renders detail view on success', async () => {
    const entry = { service: 'A' }
    const history = [{ old: 'x' }]
    service.getFromPasswordService
      .mockResolvedValueOnce(entry)
      .mockResolvedValueOnce(history)

    const { req, res, next } = makeReqRes()
    await renderPasswordDetail(req, res, next)

    expect(res.render).toHaveBeenCalledWith('./passwords/details', {
      user: req.session.user,
      csrfToken: 'csrf123',
      entry,
      history,
      hideHeader: true,
      isCodeVerified: true,
      pageType: 'passwordDetail'
    })
  })

  it('redirects 404 when service throws 404 error', async () => {
    service.getFromPasswordService.mockRejectedValue(new Error('404 not found'))

    const { req, res, next } = makeReqRes()
    await renderPasswordDetail(req, res, next)

    expect(req.flash).toHaveBeenCalledWith('error', 'Lösenordet kunde inte hittas.')
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.redirect).toHaveBeenCalledWith('../dashboard')
  })

  it('redirects 401 when service throws 401 error', async () => {
    service.getFromPasswordService.mockRejectedValue(new Error('401 unauthorized'))

    const { req, res, next } = makeReqRes()
    await renderPasswordDetail(req, res, next)

    expect(req.flash).toHaveBeenCalledWith('error', 'Sessionen har gått ut. Logga in igen.')
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.redirect).toHaveBeenCalledWith('../login')
  })

  it('calls next(err) on other errors', async () => {
    const err = new Error('something broke')
    service.getFromPasswordService.mockRejectedValue(err)

    const { req, res, next } = makeReqRes()
    await renderPasswordDetail(req, res, next)

    expect(next).toHaveBeenCalledWith(err)
  })
})
