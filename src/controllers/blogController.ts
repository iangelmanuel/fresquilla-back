import type { Request, Response } from 'express'
import cloudinary from 'cloudinary'
import Blog from '../models/Blog'
import type { BlogRequest } from '../types/types'

const createBlog = async (req: BlogRequest, res: Response) => {
  const { title, ingredients, description, links, image } = req.body

  try {
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(image, {
      folder: 'Fresquilla',
    })

    const blog = new Blog({
      title,
      ingredients,
      description,
      links,
      image: { url: secure_url, public_id },
    })

    const blogSaved = await blog.save()
    res.status(201).json(blogSaved)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al crear el blog' })
  }
}

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
    res.status(201).json(blogs)
  } catch (error) {
    console.log(error)
  }
}

const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params
  const blog = await Blog.findById(id)

  if (!blog) {
    const err = new Error('No se encontró el blog')
    return res.status(404).json({ message: err.message })
  }

  res.status(200).json(blog)
}

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params
  const blog = await Blog.findById(id)

  if (!blog) {
    const error = new Error('No se encontró el blog')
    return res.status(404).json({ message: error.message })
  }

  blog.title = req.body.title || blog.title
  blog.ingredients = req.body.ingredients || blog.ingredients
  blog.description = req.body.description || blog.description
  blog.links = req.body.links || blog.links

  try {
    if (req.body.image.public_id !== blog.image.public_id) {
      await cloudinary.v2.uploader.destroy(blog.image.public_id)

      const { secure_url, public_id } = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: 'Fresquilla',
      })

      blog.image = { url: secure_url, public_id }
    }

    const blogUpdated = await blog.save()
    res.status(201).json(blogUpdated)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'An error occurred' })
  }
}

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    const err = new Error('No se encontró el blog')
    return res.status(404).json({ message: err.message })
  }

  try {
    const blogDeleted = await Blog.findByIdAndDelete(id)
    if (blogDeleted) {
      await cloudinary.v2.uploader.destroy(blogDeleted?.image.public_id)
      res.json({ blogDeleted })
    } else {
      res.status(404).json({ message: 'Error interno del servidor' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export { createBlog, getBlogs, getBlog, updateBlog, deleteBlog }
