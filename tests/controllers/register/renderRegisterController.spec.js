import { describe, it, expect, vi } from 'vitest'
import { renderRegister } from '../../../src/controllers/register/renderRegisterController.js'

describe('renderRegister controller', () => {
  it('renders the register view', () => {
    const req = {}
    const res = { render: vi.fn() }

    renderRegister(req, res)

    expect(res.render).toHaveBeenCalledWith('users/register')
  })
})
