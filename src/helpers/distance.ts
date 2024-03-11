import { IPointCartesian, IPointWithName } from '../domain/client.interface'

function convertCartesianPlane(
  name: string,
  latitude: number,
  longitude: number,
  phone: string
): IPointCartesian {
  return { name, x: longitude, y: latitude, phone }
}

function calculateShortestRoute(points: IPointCartesian[]): IPointWithName[] {
  const minimumCount = 2
  const positionCount = points.length

  if (positionCount < minimumCount) {
    return []
  }

  // Define o ponto inicial como o primeiro ponto
  const startingPoint = 0

  // Inicia o algoritmo do Vizinho Mais Próximo
  let route: IPointWithName[] = [
    { name: 'Ponto Inicial(empresa)', pos: startingPoint, phone: '' },
  ]

  while (route.length < positionCount) {
    let currentPoint = route[route.length - 1].pos
    let shortestDistance = Infinity
    let pointNext = -1

    for (let i = 0; i < positionCount; i++) {
      if (!route.some((point) => point.pos === i)) {
        const distance = Math.sqrt(
          Math.pow(points[currentPoint].x - points[i].x, 2) +
            Math.pow(points[currentPoint].y - points[i].y, 2)
        )

        if (distance < shortestDistance) {
          shortestDistance = distance
          pointNext = i
        }
      }
    }

    if (pointNext !== -1) {
      route.push({
        name: points[pointNext].name,
        pos: pointNext,
        phone: points[pointNext].phone,
      })
    }
  }

  // Adiciona o ponto inicial no final para fechar a rota
  route.push({ name: 'Ponto Final(empresa)', pos: startingPoint, phone: '' })

  return route
}

function calculateDynamicRoute(
  clients: {
    name: string
    latitude: number
    longitude: number
    phone: string
  }[]
): IPointWithName[] {
  const pointsCartesian: IPointCartesian[] = clients.map((client) =>
    convertCartesianPlane(
      client.name,
      client.latitude,
      client.longitude,
      client.phone
    )
  )

  // Calculando a rota mais curta começando sempre do mesmo ponto (primeiro cliente)
  return calculateShortestRoute(pointsCartesian)
}

export { calculateDynamicRoute }
