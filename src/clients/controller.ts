import { Request, Response } from 'express'
import { query } from '../../db'
import { calcularRotaDinamica } from '../distance2'

export const cadastrarCliente = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, coordinate_x, coordinate_y } = req.body

    const result = await query(
      'INSERT INTO clients (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, coordinate_x, coordinate_y]
    )

    res.status(201).json({
      message: 'Cliente cadastrado com sucesso!',
      cliente: result.rows[0],
    })
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

export const listarClientes = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query

    // Função para construir a parte da query SQL com base no filtro
    const buildFilterQuery = () => {
      if (filter) {
        return `WHERE name ILIKE '%${filter}%' OR email ILIKE '%${filter}%' OR phone = '${filter}'`
      }
      return ''
    }

    const filterQuery = buildFilterQuery()

    // Construa a query SQL completa
    const sql = `SELECT * FROM clients ${filterQuery}`

    const result = await query(sql)
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Erro ao listar clientes:', error)
    res.status(500).json({ error: 'Erro interno no servidor' })
  }
}

export const distance = async (req: Request, res: Response) => {
  // Exemplo de uso
  const clientes: { name: string; latitude: number; longitude: number }[] =
    req.body

  interface PontoComNome {
    name: string
    pos: number
  }

  const rotaOtima: PontoComNome[] = calcularRotaDinamica(clientes)
  res.status(200).json(rotaOtima)
}

// {
// 	"name": "Pedro",
// 	"email": "pedro@gmail.com",
// 	"phone": "123",
// 	"coordinate_x": 2,
// 	"coordinate_y": 3
// }
// {
// 	"name": "João",
// 	"email": "joao@gmail.com",
// 	"phone": "123",
// 	"coordinate_x": 1,
// 	"coordinate_y": 2
// }
// {
// 	"name": "Marcelo",
// 	"email": "marcelo@gmail.com",
// 	"phone": "123",
// 	"coordinate_x": 2,
// 	"coordinate_y": 3
// }
// {
// 	"name": "Carlos",
// 	"email": "carlos@gmail.com",
// 	"phone": "123",
// 	"coordinate_x": 4,
// 	"coordinate_y": 1
// }
