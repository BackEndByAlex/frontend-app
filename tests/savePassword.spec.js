import { describe, it, expect, vi, beforeEach } from 'vitest'
import { savePassword } from '../src/controllers/savePasswordController.js'
import * as apiClient from '../src/services/apiClient.js'

describe('savePassword', () => {
  let req, res

  beforeEach(() => {
    req = {
      session: {},
      body: {},
      flash: vi.fn()
    }
    res = {
      redirect: vi.fn()
    }
    vi.spyOn(apiClient, 'postToPasswordService').mockResolvedValue() // default success
  })

  it('redirectar till dashboard om ej verifierad eller ej inloggad', async () => {
    await savePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Du måste vara verifierad för att spara lösenord.')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('redirectar med error om fält saknas', async () => {
    req.session.user = { jwt: 'tok' }
    req.session.isCodeVerified = true
    // body utan service/username/password
    await savePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Alla fält måste fyllas i.')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('sparar lösenord och redirectar vid succé', async () => {
    req.session.user = { jwt: 'tok' }
    req.session.isCodeVerified = true
    req.body = { service: 'X', username: 'U', password: 'P' }

    await savePassword(req, res)
    expect(apiClient.postToPasswordService).toHaveBeenCalledWith(
      'passwords',
      { service: 'X', username: 'U', password: 'P' },
      'tok'
    )
    expect(req.flash).toHaveBeenCalledWith('success', 'Lösenord sparat!')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })

  it('fångar exceptions och flashar vid fel', async () => {
    apiClient.postToPasswordService.mockRejectedValue(new Error('fail'))
    req.session.user = { jwt: 'tok' }
    req.session.isCodeVerified = true
    req.body = { service: 'X', username: 'U', password: 'P' }

    await savePassword(req, res)
    expect(req.flash).toHaveBeenCalledWith('error', 'Kunde inte spara lösenord.')
    expect(res.redirect).toHaveBeenCalledWith('./dashboard')
  })
})
