import express from 'express'

import { renderHome } from '../../controllers/page/renderHomeController.js'
import { postVerifyCode } from '../../controllers/page/postVerifyCodeController.js'
import { checkSession } from '../../controllers/page/checkSessionController.js'
import { renderSmartDashboard } from '../../controllers/page/smartDashboardController.js'
import { requireAuth } from '../../authMiddleware/authMiddleware.js'

const router = express.Router()

router.get('/', renderHome)

router.post('/verify-code', postVerifyCode)

router.get('/check-session', checkSession)

router.get('/dashboard', requireAuth, renderSmartDashboard)

export default router
