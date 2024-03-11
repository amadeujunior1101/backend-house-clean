import { HttpResponse, responseSuccess } from '../../shared/contracts'
import { ClientAbstract } from '../../domain/abstract/client.abstract'
import { ClientEntity } from '../../domain/entities/client.entity'

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientAbstract) {}
  async execute(input: {
    name: string
    email: string
    phone: string
    coordinate_x: string
    coordinate_y: string
  }): Promise<HttpResponse<any>> {
    const data = {
      id: '',
      name: input.name,
      email: input.email,
      phone: input.phone,
      coordinate_x: input.coordinate_x,
      coordinate_y: input.coordinate_y,
    }

    try {
      const client = new ClientEntity(data)
      const newClient = await this.clientRepository.create(client)

      return responseSuccess(newClient)
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao criar usuário')
    }
  }
}
