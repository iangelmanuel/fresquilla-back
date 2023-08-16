import type { Request, Response, NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import Admin, { type AdminInterface } from '../models/Admin'

interface RequestWithUser extends Request {
  user?: AdminInterface | null
}

const checkAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    const error = new Error('No autorizado, no hay token')
    return res.status(401).json({ message: error.message })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    const adminId = decoded.id
    req.user = (await Admin.findById(adminId).select('-password -updatedAt -createdAt -__v')) as AdminInterface | null
    next()

  } catch (err) {
    const error = new Error('No autorizado, token inválido')
    return res.status(401).json({ message: error.message })
  }
}

export default checkAuth
