import { describe, it, expect, vi } from 'vitest'
import { generatePassword } from '../../../src/controllers/password/generatePasswordController.js'
import * as util from '../../../src/utils/passwordGenerator.js'

vi.mock('../../../src/utils/passwordGenerator.js')

describe('generatePassword controller', () => {
  it('returns 200 and a generated password', () => {
    const fake = 'Abc123!@#'
    util.generateStrongPassword.mockReturnValue(fake)

    const req = {}
    const res = {
      status: vi.fn(() => res),
      json: vi.fn()
    }

    generatePassword(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ password: fake })
  })
})
