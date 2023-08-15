import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface AdminInterface extends Document {
  name: string
  email: string
  password: string
  comparePassword: (password: string) => Promise<boolean>
}

const adminSchema = new mongoose.Schema<AdminInterface>({
  name: {
    type: String,
    immutable: true,
    required: true
  },
  email: {
    type: String,
    immutable: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
adminSchema.methods.comparePassword = async function(passwordForm: string) {
  return await bcrypt.compare(passwordForm, this.password)
}

const Admin = mongoose.model('Admin', adminSchema)
export default Admin
