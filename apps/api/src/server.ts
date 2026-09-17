import { app } from './app.js'
import { config } from './config.js'
import { connectToDatabase, disconnectFromDatabase } from './database.js'

async function start(): Promise<void> {
  await connectToDatabase(config.mongoUri)

  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(
      `Sol Hair API listening on http://localhost:${config.port} (${config.nodeEnv}).`,
    )
    if (!config.mongoUri) {
      console.log('MONGODB_URI is not configured; database access is disabled.')
    }
  })

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received; shutting down.`)
    server.close(async () => {
      await disconnectFromDatabase()
      process.exit(0)
    })
  }

  process.once('SIGINT', () => void shutdown('SIGINT'))
  process.once('SIGTERM', () => void shutdown('SIGTERM'))
}

start().catch((error: unknown) => {
  console.error('API failed to start.', error)
  process.exit(1)
})
