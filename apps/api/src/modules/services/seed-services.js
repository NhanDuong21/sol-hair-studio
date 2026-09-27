import 'dotenv/config'
import { config } from '../../config/env.js'
import { cloudinaryImageUrl } from '../../config/cloudinary.js'
import {
  connectToDatabase,
  disconnectFromDatabase,
} from '../../config/database.js'
import { services } from './services.data.js'
import { ServiceModel } from './services.model.js'

if (!config.mongoUri) {
  throw new Error('Cần cấu hình MONGODB_URI trong apps/api/.env để nạp dịch vụ.')
}

if (!config.cloudinaryCloudName) {
  throw new Error(
    'Cần cấu hình CLOUDINARY_CLOUD_NAME trong apps/api/.env để tạo URL ảnh.',
  )
}

for (const service of services) {
  if (!service.imagePublicId) {
    throw new Error(`Thiếu public ID Cloudinary cho dịch vụ ${service.slug}.`)
  }
}

try {
  await connectToDatabase(config.mongoUri)
  await ServiceModel.bulkWrite(
    services.map(({ imagePublicId, ...service }, index) => ({
      updateOne: {
        filter: { id: service.id },
        update: {
          $set: {
            ...service,
            imageUrl: cloudinaryImageUrl(
              config.cloudinaryCloudName,
              imagePublicId,
            ),
            isActive: true,
            displayOrder: index,
          },
        },
        upsert: true,
      },
    })),
    { ordered: true },
  )
  console.log(`Đã nạp ${services.length} dịch vụ vào MongoDB.`)
} finally {
  await disconnectFromDatabase()
}
