import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '../../app.js'

describe('GET /api/services', () => {
  it('trả danh mục dịch vụ theo hợp đồng dữ liệu dùng chung', async () => {
    const response = await request(app).get('/api/services').expect(200)

    expect(response.body.data).toHaveLength(3)
    expect(response.body.data[0]).toEqual({
      id: 'service-cut-style',
      slug: 'cat-va-tao-kieu',
      name: 'Cắt & tạo kiểu',
      description: 'Tạo phom tóc phù hợp với gương mặt và phong cách riêng của bạn.',
      category: 'Tạo kiểu',
      durationMinutes: { min: 45, max: 60 },
      priceVnd: 450_000,
    })

    for (const service of response.body.data) {
      expect(service).toEqual({
        id: expect.any(String),
        slug: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        category: expect.any(String),
        durationMinutes: {
          min: expect.any(Number),
          max: expect.any(Number),
        },
        priceVnd: expect.any(Number),
      })
    }
  })
})
