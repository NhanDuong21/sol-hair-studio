import { describe, expect, it } from 'vitest'
import { ServiceModel } from './services.model.js'

const validService = {
  id: 'service-cut-style',
  slug: 'cat-va-tao-kieu',
  name: 'Cắt & tạo kiểu',
  description: 'Tạo phom tóc phù hợp với gương mặt và phong cách riêng của bạn.',
  category: 'Tạo kiểu',
  durationMinutes: { min: 45, max: 60 },
  priceVnd: 450_000,
  imageUrl:
    'https://res.cloudinary.com/sol-hair/image/upload/services/cut-style',
}

describe('serviceSchema', () => {
  it('chấp nhận dịch vụ có URL ảnh Cloudinary', async () => {
    await expect(new ServiceModel(validService).validate()).resolves.toBeUndefined()
  })

  it('từ chối dịch vụ thiếu URL Cloudinary', async () => {
    const service = new ServiceModel({
      ...validService,
      imageUrl: '/images/service-cut-style.png',
    })

    await expect(service.validate()).rejects.toHaveProperty('errors.imageUrl')
  })
})
