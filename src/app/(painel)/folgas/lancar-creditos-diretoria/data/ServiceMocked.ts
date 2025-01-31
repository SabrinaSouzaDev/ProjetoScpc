// // mockService.ts

import {
  Coordenadoria,
  Diretoria,
  Gerencia,
  Servidor,
} from '../type/plantaoDTO'
import {
  mocDirectorias,
  mocCoordenadorias,
  mocGerencias,
  mocServidores,
} from './mockedData'

export async function consultaDirectorias(): Promise<Diretoria[]> {
  return mocDirectorias
}

export async function consultaCoordenadoriasByDiretoria(
  diretoriaId: number,
): Promise<Coordenadoria[]> {
  return mocCoordenadorias.filter((c) => c.diretoriaId === diretoriaId)
}

export async function consultaGerenciasByDiretoria(
  diretoriaId: number,
): Promise<Gerencia[]> {
  const coordenadorias = mocCoordenadorias.filter(
    (c) => c.diretoriaId === diretoriaId,
  )
  const coordenadoriaIds = coordenadorias.map((c) => c.id)
  return mocGerencias.filter((g) =>
    coordenadoriaIds.includes(g.coordenadoriaId),
  )
}

export async function consultaGerenciasByCoordenadoria(
  coordenadoriaId: number,
): Promise<Gerencia[]> {
  return mocGerencias.filter((g) => g.coordenadoriaId === coordenadoriaId)
}

export async function consultaServidoresByDiretoria(
  diretoriaId: number,
): Promise<Servidor[]> {
  const coordenadorias = mocCoordenadorias.filter(
    (c) => c.diretoriaId === diretoriaId,
  )
  const coordenadoriaIds = coordenadorias.map((c) => c.id)
  const gerencias = mocGerencias.filter((g) =>
    coordenadoriaIds.includes(g.coordenadoriaId),
  )
  const gerenciaIds = gerencias.map((g) => g.id)
  return mocServidores.filter((s) => gerenciaIds.includes(s.id))
}

export async function consultaServidoresByCoordenadoria(
  coordenadoriaId: number,
): Promise<Servidor[]> {
  const gerencias = mocGerencias.filter(
    (g) => g.coordenadoriaId === coordenadoriaId,
  )
  const gerenciaIds = gerencias.map((g) => g.id)
  return mocServidores.filter((s) => gerenciaIds.includes(s.id))
}

export async function consultaServidoresByGerencia(
  gerenciaId: number,
): Promise<Servidor[]> {
  return mocServidores.filter((s) => s.id === gerenciaId)
}
