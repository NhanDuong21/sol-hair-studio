import cors from 'cors'
import express from 'express'
import { config } from './config/env.js'
import { errorHandler } from './middlewares/error-handler.js'
import { notFound } from './middlewares/not-found.js'
import { apiRouter } from './routes/index.js'

const allowedOrigins =
  config.corsOrigin === '*' ? true : config.corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

export function createApp({ routes = apiRouter } = {}) {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors({ origin: allowedOrigins }))
  app.use(express.json())
  app.use(routes)
  app.use(notFound)
  app.use(errorHandler)

  return app
}

export const app = createApp()
