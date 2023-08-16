import mongoose, { type ConnectOptions, Connection } from 'mongoose'

interface DatabaseConnection {
  connection: Connection
}

const conectDB = async (): Promise<DatabaseConnection> => {
  try {
    const conection = await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    const url = `${conection.connection.host}:${conection.connection.port}`
    console.log(`MongoDB connected: ${url}`)
    return { connection: conection.connection }
  } catch (error) {
    console.error(`Error: ${(error as mongoose.Error).message}`)
    process.exit(1)
  }
}
export default conectDB
