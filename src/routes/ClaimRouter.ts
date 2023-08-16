import express from 'express'
import checkAuth from '../middleware/checkAuth'
import { createClaim, getClaims, deleteClaim } from '../controllers/claimController'

const router = express.Router()
router.route('/')
  .post(createClaim)
  .get(checkAuth, getClaims)

router.delete('/:id', checkAuth, deleteClaim)

export default router
