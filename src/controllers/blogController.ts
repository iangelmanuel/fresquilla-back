import type { Request, Response } from 'express'
import cloudinary from 'cloudinary'
import Blog from '../models/Blog'

const createBlog = async (req: Request, res: Response) => {
  const { title, ingredients, description, links, image } = req.body

  try {
    const { secure_url } = await cloudinary.v2.uploader.upload(image, {
      folder: 'Fresquilla',
    })

    const blog = new Blog({
      title,
      ingredients,
      description,
      links,
      image: secure_url,
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

// const updateProject = async (req: Request, res: Response) => {
//   const { id } = req.params
//   const blog = await Blog.findById(id)

//   if (!project) {
//     const error = new Error('No se encontró el blog')
//     return res.status(404).json({ message: error.message })
//   }

//   blog.name = req.body.name || blog.name
//   blog.ingredients = req.body.ingredients || blog.ingredients
//   blog.description = req.body.description || blog.description
//   blog.links = req.body.links || blog.links
//   blog.image = req.body.image || blog.image

//   try {
//     const blogUpdated = await blog.save()
//     res.status(201).json(blogUpdated)
//   } catch (err) {
//     console.log(err)
//   }
// }

const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params
  const blog = await Blog.findById(id)

  if (!blog) {
    const error = new Error('No se encontró el blog')
    return res.status(404).json({ message: error.message })
  }

  try {
    await blog.deleteOne()
    res.status(201).json({ message: 'Blog eliminado' })
  } catch (err) {
    console.log(err)
  }
}

export { createBlog, getBlogs, getBlog }
