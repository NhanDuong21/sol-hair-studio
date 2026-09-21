import cors from 'cors'
import express from 'express'
import { config } from './config.js'
import { getDatabaseStatus } from './database.js'

const allowedOrigins =
  config.corsOrigin === '*'
    ? true
    : config.corsOrigin
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)

function isInvalidJsonError(error) {
  return (
    error instanceof SyntaxError &&
    error.status === 400 &&
    error.type === 'entity.parse.failed'
  )
}

export function createApp({ registerRoutes } = {}) {
  const app = express()

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

  registerRoutes?.(app)

  app.use((_request, response) => {
    response.status(404).json({
      status: 'error',
      code: 'NOT_FOUND',
      message: 'Không tìm thấy đường dẫn.',
    })
  })

  app.use((error, request, response, next) => {
    if (response.headersSent) {
      return next(error)
    }

    if (isInvalidJsonError(error)) {
      return response.status(400).json({
        status: 'error',
        code: 'INVALID_JSON',
        message: 'Dữ liệu JSON không hợp lệ.',
      })
    }

    console.error('Lỗi nội bộ khi xử lý yêu cầu.', {
      method: request.method,
      path: request.path,
      name: error instanceof Error ? error.name : 'UnknownError',
    })

    return response.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: 'Máy chủ gặp lỗi. Vui lòng thử lại sau.',
    })
  })

  return app
}

export const app = createApp()
