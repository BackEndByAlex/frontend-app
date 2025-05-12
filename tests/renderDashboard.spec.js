import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderDashboard } from '../src/controllers/pageController.js'

describe('renderDashboard', () => {
  let req, res

  beforeEach(() => {
    req = {
      session: {},
      flash: vi.fn()
    }
    res = {
      redirect: vi.fn(),
      render: vi.fn()
    }
  })

  it('om användare saknas ska den flasha error och redirecta till "/"', () => {
    renderDashboard(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Du måste logga in först.')
    expect(res.redirect).toHaveBeenCalledWith('./')
  })

  it('renderar dashboard när user finns i session', () => {
    req.session.user = { id: 'u1', name: 'Test' }
    req.session.isCodeVerified = true

    renderDashboard(req, res)
    expect(res.render).toHaveBeenCalledWith('dashboard/dashboard', {
      user: req.session.user,
      isCodeVerified: true,
      hideHeader: true,
      pageType: 'dashboard'
    })
  })
})
