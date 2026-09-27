import { services } from './services.data.js'

export function listServices(_request, response) {
  response.status(200).json({ data: services })
}
