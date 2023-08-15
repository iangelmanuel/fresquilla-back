import { Request, Response } from 'express'
import Claim from '../models/Claim'

export const createClaim = async (req: Request, res: Response) => {
  const claim = new Claim(req.body)

  try {
    const claimSaved = await claim.save()
    res.status(201).json(claimSaved)
  } catch (err) {
    console.log(err)
  }
}

export const getClaims = async (req: Request, res: Response) => {
  try {
    const claims = await Claim.find()
    res.status(201).json(claims)
  } catch (error) {
    console.log(error)
  }
}

export const deleteClaim = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const claimDeleted = await Claim.findByIdAndDelete(id)
    res.json({ claimDeleted })
  } catch (error) {
    console.log(error)
  }
}
