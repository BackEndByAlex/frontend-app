import { describe, it, expect, vi, beforeEach } from 'vitest'
import { handleFormRegistration } from '../../../src/controllers/register/handleRegistrationController.js'
import * as validator from '../../../src/validators/registerValidator.js'
import * as service from '../../../src/services/auth/registerUser.js'

vi.mock('../../../src/validators/registerValidator.js')
vi.mock('../../../src/services/auth/registerUser.js')

describe('handleFormRegistration', () => {
  let req, res

  beforeEach(() => {
    vi.clearAllMocks()
    req = { body: {}, flash: vi.fn() }
    res = {
      status: vi.fn(() => res),
      redirect: vi.fn()
    }
  })

  it('redirects back with 400 if validation fails', async () => {
    validator.validateRegisterForm.mockReturnValue('Name is required')

    await handleFormRegistration(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', 'Name is required')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.redirect).toHaveBeenCalledWith('./register')
    expect(service.registerUser).not.toHaveBeenCalled()
  })

  it('calls service and redirects to login on success', async () => {
    validator.validateRegisterForm.mockReturnValue(undefined)
    service.registerUser.mockResolvedValue()

    await handleFormRegistration(req, res)

    expect(service.registerUser).toHaveBeenCalledWith(req.body)
    expect(req.flash).toHaveBeenCalledWith('success', 'Registreringen lyckades! Du kan nu logga in.')
    expect(res.status).toHaveBeenCalledWith(302)
    expect(res.redirect).toHaveBeenCalledWith('./login')
  })

  it('logs error and redirects back with 500 on service failure', async () => {
    validator.validateRegisterForm.mockReturnValue(undefined)
    const err = new Error('oops')
    service.registerUser.mockRejectedValue(err)

    await handleFormRegistration(req, res)

    expect(req.flash).toHaveBeenCalledWith('error', err.message)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.redirect).toHaveBeenCalledWith('./register')
  })
})
