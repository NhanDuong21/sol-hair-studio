import request from 'supertest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { app, createApp } from './app.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('GET /api/health', () => {
  it('báo API hoạt động mà không cần thông tin đăng nhập cơ sở dữ liệu', async () => {
    const response = await request(app).get('/api/health').expect(200)

    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'sol-hair-api',
      database: 'not-configured',
    })
    expect(Number.isNaN(Date.parse(response.body.timestamp))).toBe(false)
  })
})

describe('phản hồi lỗi JSON thống nhất', () => {
  it('trả 404 có mã lỗi khi route không tồn tại', async () => {
    const response = await request(app).get('/api/khong-ton-tai').expect(404)

    expect(response.body).toEqual({
      status: 'error',
      code: 'NOT_FOUND',
      message: 'Không tìm thấy đường dẫn.',
    })
  })

  it('trả 400 khi request chứa JSON không hợp lệ', async () => {
    const response = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{"status":')
      .expect(400)

    expect(response.body).toEqual({
      status: 'error',
      code: 'INVALID_JSON',
      message: 'Dữ liệu JSON không hợp lệ.',
    })
  })

  it('trả 500 an toàn mà không cần endpoint lỗi trong ứng dụng thật', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const testApp = createApp({
      registerRoutes(router) {
        router.get('/api/test-only/error', () => {
          throw new Error('chi-tiet-noi-bo-khong-duoc-lo')
        })
      },
    })

    const response = await request(testApp)
      .get('/api/test-only/error')
      .expect(500)

    expect(response.body).toEqual({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: 'Máy chủ gặp lỗi. Vui lòng thử lại sau.',
    })
    expect(JSON.stringify(response.body)).not.toContain(
      'chi-tiet-noi-bo-khong-duoc-lo',
    )
    expect(consoleError).toHaveBeenCalledWith(
      'Lỗi nội bộ khi xử lý yêu cầu.',
      expect.objectContaining({
        method: 'GET',
        path: '/api/test-only/error',
        name: 'Error',
      }),
    )
  })
})
