import { Request } from 'express'

// Admin types
export interface AdminLoginRequest extends Request {
  body: {
    email: string | undefined
    password: string | undefined
  }
}

export interface AdminProfileRequest extends Request {
  user: {
    _id: string
    name: string
    email: string
  }
}

// Blog types
export interface BlogRequest extends Request {
  body: {
    title: string
    ingredients: string[]
    description: string[]
    links: string[]
    image: string
  }
}