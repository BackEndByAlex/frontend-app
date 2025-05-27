import { describe, it, expect, vi } from 'vitest'
import { renderSmartDashboard } from '../../../src/controllers/page/smartDashboardController.js'
import * as pwdCtrl from '../../../src/controllers/page/renderPasswordController.js'
import * as dashCtrl from '../../../src/controllers/page/renderDashboardController.js'

vi.mock('../../../src/controllers/page/renderPasswordController.js')
vi.mock('../../../src/controllers/page/renderDashboardController.js')

describe('smartDashboard controller', () => {
  it('calls renderPassword when code verified', () => {
    const req = { session: { isCodeVerified: true } }
    const res = {}
    const next = vi.fn()

    renderSmartDashboard(req, res, next)

    expect(pwdCtrl.renderPassword).toHaveBeenCalledWith(req, res, next)
  })

  it('calls renderDashboard when code not verified', () => {
    const req = { session: { isCodeVerified: false } }
    const res = {}
    const next = vi.fn()

    renderSmartDashboard(req, res, next)

    expect(dashCtrl.renderDashboard).toHaveBeenCalledWith(req, res, next)
  })
})
