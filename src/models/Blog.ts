import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: {
    type: Array,
    required: false,
    trim: true,
  },
  description: {
    type: Array,
    required: true,
    trim: true,
  },
  links: {
    type: Array,
    required: false,
    trim: true,
  },
  image: {
    type: Object,
    required: true,
    trim: true,
  }
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
