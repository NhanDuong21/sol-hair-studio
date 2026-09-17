import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from './app.js'

describe('GET /api/health', () => {
  it('reports a healthy API without requiring database credentials', async () => {
    const response = await request(app).get('/api/health').expect(200)

    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'sol-hair-api',
      database: 'not-configured',
    })
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false)
  })
})
