
import {Router} from 'express'
import TokenController from '../controllers/TokenController'

const router = Router()

export default router.post('/', TokenController)