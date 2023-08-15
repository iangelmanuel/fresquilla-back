import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  links: {
    type: String,
    required: false,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
