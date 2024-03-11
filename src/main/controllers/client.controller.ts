import { Request, Response } from 'express'
import { calculateDynamicRoute } from '../../helpers/distance'
import { CreateClientUseCase } from '../../application/useCases/createClient.useCase'
import { ListClientUseCase } from '../../application/useCases/listClient.useCase'
import { IFilterType, IPointWithName } from '../../domain/client.interface'

class ClientController {
  constructor(
    private readonly createClient: CreateClientUseCase,
    private readonly listClient: ListClientUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.createClient.execute(req.body)

      res.status(result.status).json({
        message: 'Cliente cadastrado com sucesso!',
        clients: result,
      })
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  list = async (req: Request, res: Response) => {
    try {
      const { filter } = req.query as { filter: IFilterType }

      const result = await this.listClient.execute(filter)
      res.status(200).json(result)
    } catch (error) {
      console.error('Erro ao listar clientes:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  distance = async (req: Request, res: Response) => {
    const clients: {
      name: string
      latitude: number
      longitude: number
      phone: string
    }[] = req.body

    const route: IPointWithName[] = calculateDynamicRoute(clients)
    res.status(200).json(route)
  }
}

export { ClientController }
