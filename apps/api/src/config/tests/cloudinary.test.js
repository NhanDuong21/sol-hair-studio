import { describe, expect, it } from 'vitest'
import { cloudinaryImageUrl } from '../cloudinary.js'

describe('cloudinaryImageUrl', () => {
  it('tạo URL ảnh Cloudinary chất lượng cao phù hợp kích thước thẻ dịch vụ', () => {
    expect(cloudinaryImageUrl('sol-hair', 'services/hair spa')).toBe(
      'https://res.cloudinary.com/sol-hair/image/upload/f_auto,q_90,w_1200,c_limit/services/hair%20spa',
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
