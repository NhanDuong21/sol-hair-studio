import { getDatabaseStatus } from '../../config/database.js'
import { findActiveServices } from './services.repository.js'

export async function listServices(_request, response) {
  if (getDatabaseStatus() !== 'connected') {
    return response.status(503).json({
      status: 'error',
      code: 'DATABASE_UNAVAILABLE',
      message: 'Danh mục dịch vụ tạm thời chưa khả dụng.',
    })
  }

  const services = await findActiveServices()
  return response.status(200).json({ data: services })
}
