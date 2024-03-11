import { Database } from '../../../database'
import { ClientAbstract } from '../../domain/abstract/client.abstract'
import { IFilterType } from '../../domain/client.interface'
import { ClientEntity } from '../../domain/entities/client.entity'

export class ClientRepository extends ClientAbstract {
  constructor(private readonly database: Database) {
    super()
  }

  async create(data: Omit<ClientEntity, 'id'>): Promise<ClientEntity> {
    const { name, email, phone, coordinate_x, coordinate_y } = data

    const result = await this.database.query(
      'INSERT INTO clients (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, coordinate_x, coordinate_y]
    )

    const createdClient: ClientEntity = result.rows[0]

    return createdClient
  }

  async getAll(filter: IFilterType): Promise<ClientEntity[]> {
    const buildFilterQuery = () => {
      if (filter) {
        return `WHERE name ILIKE '%${filter}%' OR email ILIKE '%${filter}%' OR phone = '${filter}'`
      }
      return ''
    }

    const filterQuery = buildFilterQuery()

    const sql = `SELECT * FROM clients ${filterQuery}`

    const result = await this.database.query(sql)

    const clients: ClientEntity[] = result.rows

    return clients
  }
}
