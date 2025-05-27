import { describe, it, expect, vi } from 'vitest'
import { renderDashboard } from '../../../src/controllers/page/renderDashboardController.js'

describe('renderDashboard controller', () => {
  it('redirects to home when not authenticated', () => {
    const req = { session: {}, flash: vi.fn() }
    const res = { status: vi.fn(() => res), redirect: vi.fn() }

    renderDashboard(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'Du måste logga in först.')
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('./')
  })

  it('renders dashboard when authenticated', () => {
    const user = { id: 1 }
    const req = { session: { user, isCodeVerified: true }, flash: vi.fn() }
    const res = { render: vi.fn() }

    renderDashboard(req, res)

    expect(res.render).toHaveBeenCalledWith(
      'dashboard/dashboard',
      expect.objectContaining({
        user,
        isCodeVerified: true,
        hideHeader: true,
        pageType: 'dashboard'
      })
    )
  })
})
