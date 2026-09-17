import mongoose from 'mongoose'

let isConfigured = false

export async function connectToDatabase(uri) {
  if (!uri) {
    isConfigured = false
    return
  }

  isConfigured = true
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5_000 })
}

export function getDatabaseStatus() {
  if (!isConfigured) return 'not-configured'
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}
