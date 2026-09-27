import { ServiceModel } from './services.model.js'

export function findActiveServices() {
  return ServiceModel.find({ isActive: true })
    .sort({ displayOrder: 1, id: 1 })
    .select('-_id -__v -isActive -displayOrder -createdAt -updatedAt')
    .lean()
}
