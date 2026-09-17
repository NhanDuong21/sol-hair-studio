import mongoose from 'mongoose'

export type DatabaseStatus =
  | 'connected'
  | 'disconnected'
  | 'not-configured'

let isConfigured = false

export async function connectToDatabase(uri: string | undefined): Promise<void> {
  if (!uri) {
    isConfigured = false
    return
  }

  isConfigured = true
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5_000 })
}

export function getDatabaseStatus(): DatabaseStatus {
  if (!isConfigured) return 'not-configured'
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}

export async function disconnectFromDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
}
