import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../../config/database.js', () => ({
  getDatabaseStatus: vi.fn(),
}))
vi.mock('../services.repository.js', () => ({
  findActiveServices: vi.fn(),
}))

import { getDatabaseStatus } from '../../../config/database.js'
import { findActiveServices } from '../services.repository.js'
import { app } from '../../../app.js'

describe('GET /api/services', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('trả danh mục dịch vụ và URL ảnh theo hợp đồng dùng chung', async () => {
    getDatabaseStatus.mockReturnValue('connected')
    findActiveServices.mockResolvedValue([
      {
        id: 'service-cut-style',
        slug: 'cat-va-tao-kieu',
        name: 'Cắt & tạo kiểu',
        description: 'Tạo phom tóc phù hợp với gương mặt và phong cách riêng của bạn.',
        category: 'Tạo kiểu',
        durationMinutes: { min: 45, max: 60 },
        priceVnd: 450_000,
        imageUrl:
          'https://res.cloudinary.com/sol-hair/image/upload/f_auto,q_auto/services/cut-style',
      },
    ])

    const response = await request(app).get('/api/services').expect(200)

    expect(response.body.data).toEqual([
      {
        id: 'service-cut-style',
        slug: 'cat-va-tao-kieu',
        name: 'Cắt & tạo kiểu',
        description: 'Tạo phom tóc phù hợp với gương mặt và phong cách riêng của bạn.',
        category: 'Tạo kiểu',
        durationMinutes: { min: 45, max: 60 },
        imageUrl:
          'https://res.cloudinary.com/sol-hair/image/upload/f_auto,q_auto/services/cut-style',
        priceVnd: 450_000,
      },
    ])
    expect(findActiveServices).toHaveBeenCalledOnce()

    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      imageUrl: expect.stringMatching(/^https:\/\/res\.cloudinary\.com\//),
    })
  })

  it('trả 503 khi MongoDB chưa được cấu hình hoặc chưa kết nối', async () => {
    getDatabaseStatus.mockReturnValue('not-configured')

    const response = await request(app).get('/api/services').expect(503)

    expect(response.body).toEqual({
      status: 'error',
      code: 'DATABASE_UNAVAILABLE',
      message: 'Danh mục dịch vụ tạm thời chưa khả dụng.',
    })
    expect(findActiveServices).not.toHaveBeenCalled()
  })
})
