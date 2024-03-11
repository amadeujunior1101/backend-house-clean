import express, { Request, Response } from 'express'
import {} from './main/controllers/client.controller'
import { clientController } from './infra/containers/client.container'
import { ClientDTO } from './application/useCases/dtos/createClient.dto'
import { validate } from 'class-validator'

const routes = express.Router()

routes.post('/clients', async (req: Request, res: Response) => {
  const { name, email, phone, coordinate_x, coordinate_y } = req.body
  const client = new ClientDTO(name, email, phone, coordinate_x, coordinate_y)

  const errors = await validate(client)

  if (errors.length > 0) {
    return res.status(400).json(errors)
  }
  return clientController.create(req, res)
})

routes.get('/clients', async (req: Request, res: Response) => {
  return clientController.list(req, res)
})

routes.post('/clients/distance', async (req: Request, res: Response) => {
  return clientController.distance(req, res)
})

export { routes }
