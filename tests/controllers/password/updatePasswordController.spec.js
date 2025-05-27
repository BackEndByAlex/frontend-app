import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updatePassword } from '../../../src/controllers/password/updatePasswordController.js'
import * as service from '../../../src/services/password/changePasswordService.js'

vi.mock('../../../src/services/password/changePasswordService.js')

describe('updatePassword controller', () => {
  beforeEach(() => vi.clearAllMocks())

  it('updates and redirects on success', async () => {
    const req = {
      session: { user: { jwt: 'tok' } },
      params: { id: '123' },
      body: { password: 'newpass' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }
    await updatePassword(req, res)
    expect(service.changePasswordService).toHaveBeenCalledWith(
      'passwords/123',
      { password: 'newpass' },
      'tok'
    )
    expect(req.flash).toHaveBeenCalledWith('success', 'Lösenordet har uppdaterats')
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('../../passwords/123')
  })

  it('handles error and redirects back', async () => {
    const err = new Error('oops')
    service.changePasswordService.mockRejectedValue(err)

    const req = {
      session: { user: { jwt: 'tok' } },
      params: { id: '123' },
      body: { password: 'newpass' },
      flash: vi.fn()
    }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    await updatePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'oops')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('./passwords/123')
  })
})
