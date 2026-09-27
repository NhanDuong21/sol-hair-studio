import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./services.model.js', () => ({
  ServiceModel: { find: vi.fn() },
}))

import { ServiceModel } from './services.model.js'
import { findActiveServices } from './services.repository.js'

describe('findActiveServices', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('lọc dịch vụ đang hoạt động và sắp xếp thứ tự hiển thị ổn định', async () => {
    const documents = [{ id: 'service-cut-style' }]
    const query = {
      sort: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(documents),
    }
    ServiceModel.find.mockReturnValue(query)

    await expect(findActiveServices()).resolves.toBe(documents)

    expect(ServiceModel.find).toHaveBeenCalledWith({ isActive: true })
    expect(query.sort).toHaveBeenCalledWith({ displayOrder: 1, id: 1 })
    expect(query.select).toHaveBeenCalledWith(
      '-_id -__v -isActive -displayOrder -createdAt -updatedAt',
    )
    expect(query.lean).toHaveBeenCalledOnce()
  })
})
