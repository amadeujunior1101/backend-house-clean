// Definindo as dimensões do plano cartesiano
const maxX: number = 10
const maxY: number = 10

// Interface para representar coordenadas
interface Coordenadas {
  x: number
  y: number
}

// Função para converter coordenadas para dentro do range
function converterCoordenadas(coordenadas: Coordenadas): Coordenadas {
  // Limitando a coordenada x ao intervalo [-maxX, maxX]
  const x: number = Math.max(-maxX, Math.min(maxX, coordenadas.x))

  // Limitando a coordenada y ao intervalo [-maxY, maxY]
  const y: number = Math.max(-maxY, Math.min(maxY, coordenadas.y))

  return { x, y }
}

// Coordenadas originais
const coordenadasOriginais: Coordenadas = { x: -47.8875143, y: -5.466462 }

// Convertendo as coordenadas para dentro do range
const coordenadasConvertidas: Coordenadas =
  converterCoordenadas(coordenadasOriginais)

// Exibindo as coordenadas originais e convertidas
console.log('Coordenadas Originais:', coordenadasOriginais)
console.log('Coordenadas Convertidas:', coordenadasConvertidas)
