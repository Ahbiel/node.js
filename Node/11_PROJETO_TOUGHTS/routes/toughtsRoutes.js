import express from 'express'
import ToughtController from '../controllers/ToughtsController.js'
import {checkAuth} from '../helper/auth.js'
const router = express.Router()

router.get('/add',checkAuth, ToughtController.createTought)
router.get('/dashboard',checkAuth, ToughtController.dashboard)
router.post('/add',checkAuth, ToughtController.createToughtSave)
router.get('/', ToughtController.showToughts)

export default router