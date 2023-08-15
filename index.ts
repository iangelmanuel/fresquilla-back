import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import conectDB from './config/db'
import cors, { CorsOptions } from 'cors'
import cloudinary from 'cloudinary'

import ContactRouter from './routes/ContactRouter'
import ClaimRouter from './routes/ClaimRouter'
import BlogRouter from './routes/BlogRouter'
import AdminRouter from './routes/AdminRouter'

// CONFIG
const app = express()
app.use(express.json())
dotenv.config()
conectDB()

// CORS
const whitelist = [process.env.FRONTEND_URL]
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// CLOUDINARY
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
})

// ROUTES
app.use('/api/contact', ContactRouter)
app.use('/api/claim', ClaimRouter)
app.use('/api/blog', BlogRouter)
app.use('/api/admin', AdminRouter)

// SERVER
const PORT = 4000 || process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
