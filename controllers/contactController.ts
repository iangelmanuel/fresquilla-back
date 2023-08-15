import { Request, Response } from 'express'
import Contact from '../models/Contact'

export const createContact = async (req: Request, res: Response) => {
  const contact = new Contact(req.body)

  try {
    const contactSaved = await contact.save()
    res.status(201).json(contactSaved)
  } catch (err) {
    console.log(err)
  }
}

export const getContacts = async (req: Request, res: Response) => {
  try {
    const claims = await Contact.find()
    res.status(201).json(claims)
  } catch (error) {
    console.log(error)
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const contactDeleted = await Contact.findByIdAndDelete(id)
    res.json({ contactDeleted })
  } catch (error) {
    console.log(error)
  }
}
