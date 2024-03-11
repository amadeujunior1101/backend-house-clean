import { IFilterType } from '../client.interface'
import { ClientEntity } from '../entities/client.entity'

export abstract class ClientAbstract {
  abstract create(data: Omit<ClientEntity, 'id'>): Promise<ClientEntity>
  abstract getAll(filter: IFilterType): Promise<ClientEntity[]>
}
