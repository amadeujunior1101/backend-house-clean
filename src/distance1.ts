interface PontoCartesiano {
  x: number
  y: number
}

function converterParaPlanoCartesiano(
  latitude: number,
  longitude: number
): PontoCartesiano {
  // Simplificação: Ignorando a curvatura da Terra e usando diretamente as coordenadas como X e Y
  return { x: longitude, y: latitude }
}

function calcularRotaMaisCurta(
  pontos: PontoCartesiano[],
  pontoInicial: number
): number[] {
  const n = pontos.length

  if (n < 2) {
    // Não há rota para calcular com menos de 2 pontos
    return []
  }

  // Inicia o algoritmo do Vizinho Mais Próximo
  let rota: number[] = [pontoInicial]

  while (rota.length < n) {
    let pontoAtual = rota[rota.length - 1]
    let menorDistancia = Infinity
    let proximoPonto = -1

    for (let i = 0; i < n; i++) {
      if (!rota.includes(i)) {
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
      rota.push(proximoPonto)
    }
  }

  // Adiciona o ponto inicial no final para fechar a rota
  rota.push(pontoInicial)

  return rota
}

// Exemplo de uso
const clientes: { latitude: number; longitude: number }[] = [
  { latitude: 0, longitude: 0 },
  { latitude: 2, longitude: 2 },
  { latitude: 4, longitude: 3 },
  { latitude: 1, longitude: 1 },
  { latitude: -4, longitude: 4 },
]

// Convertendo coordenadas geográficas para coordenadas cartesianas
const pontosCartesianos: PontoCartesiano[] = clientes.map((cliente) =>
  converterParaPlanoCartesiano(cliente.latitude, cliente.longitude)
)

// Calculando a rota mais curta começando de um ponto diferente
const rotaOtima: number[] = calcularRotaMaisCurta(pontosCartesianos, 0) // Começando do primeiro cliente
console.log('Rota mais curta:', rotaOtima)
