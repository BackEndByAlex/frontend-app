import { describe, it, expect, vi } from 'vitest'
import { terms } from '../../../src/controllers/page/termsController.js'

describe('terms controller', () => {
  it('renders the terms view', () => {
    const req = {}
    const res = { render: vi.fn() }

    terms(req, res)

    expect(res.render).toHaveBeenCalledWith('users/terms')
  })
})
