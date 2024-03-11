import { Database } from '../../../database'
import { CreateClientUseCase } from '../../application/useCases/createClient.useCase'
import { ListClientUseCase } from '../../application/useCases/listClient.useCase'
import { ClientController } from '../../main/controllers/client.controller'
import { ClientRepository } from '../repositories/client.repository'

const clientRepository = new ClientRepository(Database.getInstance())
const createClientUseCase = new CreateClientUseCase(clientRepository)
const getClientUseCase = new ListClientUseCase(clientRepository)

const clientController = new ClientController(
  createClientUseCase,
  getClientUseCase
)

export { clientController }
