import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getFeedbackFromAuth } from '../../../src/controllers/feedback/getFeedbackController.js'
import * as service from '../../../src/services/auth/getFeedbackFromAuth.js'

vi.mock('../../../src/services/auth/getFeedbackFromAuth.js')

describe('getFeedbackFromAuth controller', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sends 500 and logs on error', async () => {
    const error = new Error('fail')
    service.getFeedbackAuth.mockRejectedValue(error)
    const res = {
      status: vi.fn(() => res),
      json: vi.fn()
    }

    // controller swallows return-value path and uses res
    const result = await getFeedbackFromAuth({}, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Kunde inte hämta feedback' })
    expect(result).toBeUndefined()
  })
})
