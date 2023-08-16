import express from 'express'
import checkAuth from '../middleware/checkAuth'
import upload from '../middleware/fieldSize'
import { createBlog, getBlogs, getBlog } from '../controllers/blogController'

const router = express.Router()

router.route('/blogs-data')
  .get(getBlogs)
  .post(checkAuth, upload.single('image'), createBlog)
router.get('/blog/:id', getBlog)

export default router
