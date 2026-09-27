import { describe, expect, it } from 'vitest'
import { cloudinaryImageUrl } from '../cloudinary.js'

describe('cloudinaryImageUrl', () => {
  it('tạo URL phân phối ảnh Cloudinary gốc không qua biến đổi nén', () => {
    expect(cloudinaryImageUrl('sol-hair', 'services/hair spa')).toBe(
      'https://res.cloudinary.com/sol-hair/image/upload/services/hair%20spa',
    )
  })

  it('báo lỗi khi thiếu cloud name hoặc public ID', () => {
    expect(() => cloudinaryImageUrl('', 'services/cut')).toThrow(
      'Cần cấu hình Cloudinary cloud name và public ID của ảnh.',
    )
    expect(() => cloudinaryImageUrl('sol-hair', '')).toThrow(
      'Cần cấu hình Cloudinary cloud name và public ID của ảnh.',
    )
  })
})
