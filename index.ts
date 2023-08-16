import express from 'express'
import dotenv from 'dotenv'
import cors, { type CorsOptions } from 'cors'
import cloudinary from 'cloudinary'
import conectDB from './src/config/db'

import ContactRouter from './src/routes/ContactRouter'
import ClaimRouter from './src/routes/ClaimRouter'
import BlogRouter from './src/routes/BlogRouter'
import AdminRouter from './src/routes/AdminRouter'

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
