import express from 'express'
import {
  cadastrarCliente,
  distance,
  listarClientes,
} from './clients/controller'

const routes = express.Router()

routes.post('/clients', cadastrarCliente)

routes.get('/clients', listarClientes)

routes.post('/clients/distance', distance)

export default routes
