interface PontoCartesiano {
  name: string
  x: number
  y: number
}

interface PontoComNome {
  name: string
  pos: number
}

function converterParaPlanoCartesiano(
  name: string,
  latitude: number,
  longitude: number
): PontoCartesiano {
  return { name, x: longitude, y: latitude }
}

function calcularRotaMaisCurta(pontos: PontoCartesiano[]): PontoComNome[] {
  const n = pontos.length

  if (n < 2) {
    // Não há rota para calcular com menos de 2 pontos
    return []
  }

  // Define o ponto inicial como o primeiro ponto
  const pontoInicial = 0

  // Inicia o algoritmo do Vizinho Mais Próximo
  let rota: PontoComNome[] = [{ name: 'Ponto inicial', pos: pontoInicial }]

  while (rota.length < n) {
    let pontoAtual = rota[rota.length - 1].pos
    let menorDistancia = Infinity
    let proximoPonto = -1

    for (let i = 0; i < n; i++) {
      if (!rota.some((ponto) => ponto.pos === i)) {
        const distancia = Math.sqrt(
          Math.pow(pontos[pontoAtual].x - pontos[i].x, 2) +
            Math.pow(pontos[pontoAtual].y - pontos[i].y, 2)
        )

        if (distancia < menorDistancia) {
          menorDistancia = distancia
          proximoPonto = i
        }
      }
    }

    if (proximoPonto !== -1) {
      rota.push({ name: pontos[proximoPonto].name, pos: proximoPonto })
    }
  }

  // Adiciona o ponto inicial no final para fechar a rota
  rota.push({ name: 'Ponto inicial', pos: pontoInicial })

  return rota
}

// Função para calcular a rota mais curta a partir de um array de clientes
export function calcularRotaDinamica(
  clientes: { name: string; latitude: number; longitude: number }[]
): PontoComNome[] {
  console.log('chegando cleintes:', clientes)
  // Convertendo coordenadas geográficas para coordenadas cartesianas
  const pontosCartesianos: PontoCartesiano[] = clientes.map((cliente) =>
    converterParaPlanoCartesiano(
      cliente.name,
      cliente.latitude,
      cliente.longitude
    )
  )

  // Calculando a rota mais curta começando sempre do mesmo ponto (primeiro cliente)
  return calcularRotaMaisCurta(pontosCartesianos)
}
