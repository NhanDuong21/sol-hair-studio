import 'dotenv/config'
import { resolve } from 'node:path'
import { v2 as cloudinary } from 'cloudinary'
import { services } from './data/services.js'

const requiredConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
}

if (Object.values(requiredConfig).some((value) => !value)) {
  throw new Error(
    'Cần cấu hình CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY và CLOUDINARY_API_SECRET trong apps/api/.env.',
  )
}

cloudinary.config(requiredConfig)

function isNotFound(error) {
  return error?.http_code === 404 || error?.error?.http_code === 404
}

function safeCloudinaryError(error, action) {
  const status = error?.http_code ?? error?.error?.http_code
  return new Error(
    status
      ? `Cloudinary ${action} thất bại (HTTP ${status}).`
      : `Cloudinary ${action} thất bại. Chi tiết đã được ẩn để bảo vệ thông tin xác thực.`,
  )
}

const imagePathsBySlug = {
  'cat-va-tao-kieu': '../web/public/images/service-cut-style.png',
  'nhuom-thoi-trang': '../web/public/images/service-color.png',
  'hair-spa-phuc-hoi': '../web/public/images/service-spa.png',
}

for (const service of services) {
  let existingAsset
  try {
    existingAsset = await cloudinary.api.resource(service.imagePublicId, {
      resource_type: 'image',
    })
  } catch (error) {
    if (!isNotFound(error)) throw safeCloudinaryError(error, 'kiểm tra ảnh')
  }

  if (existingAsset) {
    console.log(`Ảnh ${service.imagePublicId} đã tồn tại; giữ nguyên.`)
    continue
  }

  const imagePath = imagePathsBySlug[service.slug]
  if (!imagePath) {
    throw new Error(`Chưa khai báo file ảnh dịch vụ ${service.slug}.`)
  }

  let result
  try {
    result = await cloudinary.uploader.upload(resolve(process.cwd(), imagePath), {
      public_id: service.imagePublicId,
      overwrite: false,
      resource_type: 'image',
    })
  } catch (error) {
    throw safeCloudinaryError(error, 'tải ảnh lên')
  }

  console.log(`Đã tải ảnh ${result.public_id} lên Cloudinary.`)
}
