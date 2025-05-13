// src/routes/passwordRouter.js
import express from 'express'
import { generatePassword } from '../../controllers/password/generatePasswordController.js'
import { savePassword } from '../../controllers/password/savePasswordController.js'
import { renderPasswordDetail } from '../../controllers/password/renderPasswordDetailController.js'
import { updatePassword } from '../../controllers/password/updatePasswordController.js'
import { deletePassword } from '../../controllers/password/deletePasswordController.js'
import { requireAuth } from '../../authMiddleware/authMiddleware.js'

const router = express.Router()

router.get('/generate-password', generatePassword)

router.post('/save-password', requireAuth, savePassword)

router.get('/passwords/:id', requireAuth, renderPasswordDetail)

router.post('/passwords/:id/change', requireAuth, updatePassword)

router.post('/passwords/:id/delete', requireAuth, deletePassword)

export default router
