import 'dotenv/config'

function readPort(value) {
  const port = Number(value ?? 4000)
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT phải là số nguyên từ 1 đến 65535.')
  }
  return port
}

export const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readPort(process.env.PORT),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
  mongoUri: process.env.MONGODB_URI?.trim() || undefined,
})
