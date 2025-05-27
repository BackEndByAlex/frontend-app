import { describe, it, expect, vi } from 'vitest'
import { renderPassword } from '../../../src/controllers/page/renderPasswordController.js'
import * as pwService from '../../../src/services/password/getFromPasswordService.js'

vi.mock('../../../src/services/password/getFromPasswordService.js')

describe('renderPassword controller', () => {
  it('renders dashboard with passwords on success', async () => {
    const pw = [{ id: 1 }]
    pwService.getFromPasswordService.mockResolvedValue(pw)

    const req = {
      session: { user: { jwt: 't' }, isCodeVerified: false },
      csrfToken: vi.fn(() => 'tok'),
      flash: vi.fn()
    }
    const res = { render: vi.fn() }

    await renderPassword(req, res)

    expect(res.render).toHaveBeenCalledWith('dashboard/dashboard', {
      user: req.session.user,
      csrfToken: 'tok',
      passwords: pw,
      isCodeVerified: false,
      hideHeader: true,
      pageType: 'dashboard'
    })
  })

  it('renders dashboard with empty list on error', async () => {
    pwService.getFromPasswordService.mockRejectedValue(new Error())

    const req = {
      session: { user: { jwt: 't' }, isCodeVerified: false },
      csrfToken: vi.fn(),
      flash: vi.fn()
    }
    const res = { render: vi.fn() }

    await renderPassword(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'Kunde inte hämta sparade lösenord.')
    expect(res.render).toHaveBeenCalled()
  })
})
