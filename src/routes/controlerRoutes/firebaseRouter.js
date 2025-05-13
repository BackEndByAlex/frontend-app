import express from 'express'
import { getFirebaseConfig } from '../../controllers/firebase/getFirebaseConfigController.js'

const router = express.Router()

router.get('/firebase-config', getFirebaseConfig)

export default router
