import { describe, expect, it } from 'vitest'
import { cloudinaryImageUrl } from '../cloudinary.js'

describe('cloudinaryImageUrl', () => {
  it('tạo URL phân phối ảnh Cloudinary với tối ưu định dạng và chất lượng', () => {
    expect(cloudinaryImageUrl('sol-hair', 'services/hair spa')).toBe(
      'https://res.cloudinary.com/sol-hair/image/upload/f_auto,q_auto/services/hair%20spa',
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
