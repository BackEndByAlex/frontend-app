import { describe, it, expect, vi } from 'vitest'
import { privacy } from '../../../src/controllers/page/privacyController.js'

describe('privacy controller', () => {
  it('renders the privacy view', () => {
    const req = {}
    const res = { render: vi.fn() }

    privacy(req, res)

    expect(res.render).toHaveBeenCalledWith('users/privacy')
  })
})
