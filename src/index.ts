import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors, { type CorsOptions } from 'cors'
import cloudinary from 'cloudinary'
import conectDB from './config/db'

import ContactRouter from './routes/ContactRouter'
import ClaimRouter from './routes/ClaimRouter'
import BlogRouter from './routes/BlogRouter'
import AdminRouter from './routes/AdminRouter'

const app = express()
app.use(express())
dotenv.config()
conectDB()
app.use(json())
app.use(urlencoded({ extended: true }))

const corsOptions: CorsOptions = {
  origin: process.env.FRONTEND_URL || '',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}
app.use(cors(corsOptions))

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

app.use('/api/contact', ContactRouter)
app.use('/api/claim', ClaimRouter)
app.use('/api/blog', BlogRouter)
app.use('/api/admin', AdminRouter)

const PORT = process.env.PORT ?? 4000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
