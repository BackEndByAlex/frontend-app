import { describe, it, expect, vi } from 'vitest'
import { generatePassword } from '../src/controllers/passwordController.js'
import * as pwGen from '../src/utils/passwordGenerator.js'

describe('generatePassword', () => {
  it('skickar tillbaka status 200 + JSON med password', () => {
    vi.spyOn(pwGen, 'generateStrongPassword').mockReturnValue('ABC123!')
    const req = {}
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }

    generatePassword(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ password: 'ABC123!' })
  })
})
