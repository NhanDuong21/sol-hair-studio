import { Router } from 'express'
import { healthRouter } from '../modules/health/health.routes.js'
import { servicesRouter } from '../modules/services/services.routes.js'

export const apiRouter = Router()

apiRouter.use('/api', healthRouter)
apiRouter.use('/api', servicesRouter)
