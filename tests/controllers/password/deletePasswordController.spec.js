import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deletePassword } from '../../../src/controllers/password/deletePasswordController.js'
import * as service from '../../../src/services/password/deletePasswordService.js'

vi.mock('../../../src/services/password/deletePasswordService.js')

describe('deletePassword controller', () => {
  beforeEach(() => vi.clearAllMocks())

  it('deletes entry and redirects on success', async () => {
    const req = {
      session: { user: { jwt: 'tok' } },
      params: { id: '456' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await deletePassword(req, res)
    expect(service.deletePasswordService).toHaveBeenCalledWith(
      'passwords/456',
      'tok'
    )
    expect(req.flash).toHaveBeenCalledWith('success', 'Lösenordet har tagits bort')
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('../../dashboard')
  })

  it('handles error and redirects back', async () => {
    const err = new Error('denied')
    service.deletePasswordService.mockRejectedValue(err)

    const req = {
      session: { user: { jwt: 'tok' } },
      params: { id: '456' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await deletePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'denied')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('../../passwords/456')
  })
})
