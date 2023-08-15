import express from 'express'
import checkAuth from '../middleware/checkAuth'
import { createContact, getContacts, deleteContact } from '../controllers/contactController'

const router = express.Router()
router.route('/')
  .post(createContact)
  .get(checkAuth, getContacts)

router.delete('/:id', checkAuth, deleteContact)

export default router
