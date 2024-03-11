interface IPointCartesian {
  name: string
  x: number
  y: number
}

interface IPointWithName {
  name: string
  pos: number
}

function convertCartesianPlane(
  name: string,
  latitude: number,
  longitude: number
): IPointCartesian {
  return { name, x: longitude, y: latitude }
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
  let route: IPointWithName[] = [{ name: 'Ponto inicial', pos: startingPoint }]

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
      route.push({ name: points[pointNext].name, pos: pointNext })
    }
  }

  // Adiciona o ponto inicial no final para fechar a rota
  route.push({ name: 'Ponto inicial', pos: startingPoint })

  return route
}

function calculateDynamicRoute(
  clients: { name: string; latitude: number; longitude: number }[]
): IPointWithName[] {
  const pointsCartesian: IPointCartesian[] = clients.map((client) =>
    convertCartesianPlane(client.name, client.latitude, client.longitude)
  )

  // Calculando a rota mais curta começando sempre do mesmo ponto (primeiro cliente)
  return calculateShortestRoute(pointsCartesian)
}

export { calculateDynamicRoute }
