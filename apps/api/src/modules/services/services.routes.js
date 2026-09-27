import { Router } from 'express'
import { listServices } from './services.controller.js'

export const servicesRouter = Router()

servicesRouter.get('/services', listServices)
