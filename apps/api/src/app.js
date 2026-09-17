import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { getDatabaseStatus } from './database.js'

export const app = express()

const allowedOrigins =
  config.corsOrigin === '*'
    ? true
    : config.corsOrigin
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)

app.disable('x-powered-by')
app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'sol-hair-api',
    database: getDatabaseStatus(),
    timestamp: new Date().toISOString(),
  })
})

app.use((_request, response) => {
  response.status(404).json({
    status: 'error',
    message: 'Không tìm thấy đường dẫn.',
  })
})
