import routes from './routes'
import './run-migrations'
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const port = 3000
app.use(cors())

app.use(express.json())
app.use(routes)

app.get('/', (_req: Request, res: Response) => {
  res.send('health check')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
