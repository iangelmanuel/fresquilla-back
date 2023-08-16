import type { Request, Response } from 'express'
import Admin from '../models/Admin'
import generateJWT from '../helper/generateJWT'

interface RequestWithUser extends Request {
  user?: string | null
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })

  if (!admin) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ message: error.message })
  }

  const passwordMatch = await admin.comparePassword(password)

  if (passwordMatch) {
    res.status(201).json({ _id: admin._id, name: admin.name, email: admin.email, token: generateJWT(admin._id) })
  } else {
    const error = new Error('El correo o la contraseña son incorrectos')
    return res.status(401).json({ message: error.message })
  }
}

const adminProfile = async (req: RequestWithUser, res: Response) => {
  const { user } = req
  res.json(user)
}

export { login, adminProfile }
