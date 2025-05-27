import mongoose from 'mongoose'
import { logger } from '../config/winston.js'

/**
 * Connects to MongoDB using the DB_CONNECTION_STRING environment variable.
 *
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 * @throws {Error} If the connection fails.
 */
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION_STRING) // Use the correct env variable
    logger.log('Connected to MongoDB')
  } catch (error) {
    logger.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB
