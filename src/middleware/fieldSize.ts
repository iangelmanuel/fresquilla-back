import multer from 'multer'

const upload = multer({
  limits: {
    fieldSize: 1024 * 1024 * 10 // 10 MB
  }
})

export default upload
