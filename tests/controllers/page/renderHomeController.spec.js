import { describe, it, expect, vi } from 'vitest'
import { renderHome } from '../../../src/controllers/page/renderHomeController.js'
import * as fbService from '../../../src/controllers/feedback/getFeedbackController.js'

vi.mock('../../../src/controllers/feedback/getFeedbackController.js')

describe('renderHome controller', () => {
  it('renders home with feedback on success', async () => {
    const feedbacks = [{ text: 'ok' }]
    fbService.getFeedbackFromAuth.mockResolvedValue(feedbacks)

    const req = { session: {}, csrfToken: vi.fn() }
    const res = { render: vi.fn() }

    await renderHome(req, res)

    expect(res.render).toHaveBeenCalledWith('home/index', {
      title: 'Home',
      user: undefined,
      feedbacks
    })
  })

  it('renders home with empty feedback on error', async () => {
    fbService.getFeedbackFromAuth.mockRejectedValue(new Error())

    const req = { session: {}, csrfToken: vi.fn() }
    const res = { render: vi.fn() }

    await renderHome(req, res)

    expect(res.render).toHaveBeenCalledWith('home/index', {
      title: 'Home',
      user: undefined,
      feedbacks: []
    })
  })
})
