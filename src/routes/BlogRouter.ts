import express from 'express'
import checkAuth from '../middleware/checkAuth'
import upload from '../middleware/fieldSize'
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController'

const router = express.Router()

router.route('/blogs-data')
  .get(getBlogs)
  .post(checkAuth, upload.single('image'), createBlog)
router.route('/blog-data/:id')
  // .get(getBlogs)
  .put(checkAuth, upload.single('image'), updateBlog)
  .delete(checkAuth, deleteBlog)
router.get('/blog/:id', getBlog)

export default router
