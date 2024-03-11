import { HttpResponse, responseSuccess } from '../../shared/contracts'
import { ClientAbstract } from '../../domain/abstract/client.abstract'
import { IFilterType } from '../../domain/client.interface'

export class ListClientUseCase {
  constructor(private readonly clientRepository: ClientAbstract) {}
  async execute(filter: IFilterType): Promise<HttpResponse<any>> {
    try {
      const listClients = await this.clientRepository.getAll(filter)

      return responseSuccess(listClients)
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao listar usuários')
    }
  }
}
