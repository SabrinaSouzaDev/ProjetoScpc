import {
  Coordenadoria,
  Diretoria,
  Gerencia,
  Plantao,
  Servidor,
} from '../type/plantaoDTO'

export const mocDirectorias: Diretoria[] = [
  { id: 1, nome: 'Diretoria de Recursos Humanos' },
  { id: 2, nome: 'Diretoria de Tecnologia da Informação' },
  { id: 3, nome: 'Diretoria de Finanças' },
]

export const mocCoordenadorias: Coordenadoria[] = [
  {
    id: 1,
    nome: 'Coordenadoria de Desenvolvimento de Pessoas',
    diretoriaId: 1,
  },
  { id: 2, nome: 'Coordenadoria de Recrutamento e Seleção', diretoriaId: 1 },
  { id: 3, nome: 'Coordenadoria de Infraestrutura', diretoriaId: 2 },
  { id: 4, nome: 'Coordenadoria de Sistemas', diretoriaId: 2 },
  { id: 5, nome: 'Coordenadoria de Contabilidade', diretoriaId: 3 },
  { id: 6, nome: 'Coordenadoria de Orçamento', diretoriaId: 3 },
]

export const mocGerencias: Gerencia[] = [
  { id: 1, nome: 'Gerência de Treinamento', coordenadoriaId: 1 },
  { id: 2, nome: 'Gerência de Seleção', coordenadoriaId: 2 },
  { id: 3, nome: 'Gerência de Redes', coordenadoriaId: 3 },
  { id: 4, nome: 'Gerência de Desenvolvimento', coordenadoriaId: 4 },
  { id: 5, nome: 'Gerência de Controle Financeiro', coordenadoriaId: 5 },
  { id: 6, nome: 'Gerência de Planejamento Orçamentário', coordenadoriaId: 6 },
]

export const mocServidores: Servidor[] = [
  {
    id: 1,
    pessoa: { nomeCompleto: 'Servidor 1', cpf: '111.111.111-11' },
    matricula: '123',
  },
  {
    id: 2,
    pessoa: { nomeCompleto: 'Servidor 2', cpf: '222.222.222-22' },
    matricula: '456',
  },
  {
    id: 3,
    pessoa: { nomeCompleto: 'Servidor 3', cpf: '333.333.333-33' },
    matricula: '789',
  },
  {
    id: 4,
    pessoa: { nomeCompleto: 'Servidor 4', cpf: '444.444.444-44' },
    matricula: '101',
  },
]

export const mocCreditos: Plantao[] = [
  {
    servidorId: 1,
    saldo: 10,
    inicioPlantao: '2024-07-01',
    fimPlantao: '2024-07-10',
    prescrito: false,
    converterPecunia: true,
  },
  {
    servidorId: 2,
    saldo: 5,
    inicioPlantao: '2024-07-05',
    fimPlantao: '2024-07-10',
    prescrito: true,
    converterPecunia: false,
  },
  {
    servidorId: 3,
    saldo: 8,
    inicioPlantao: '2024-07-01',
    fimPlantao: '2024-07-08',
    prescrito: false,
    converterPecunia: true,
  },
  {
    servidorId: 4,
    saldo: 3,
    inicioPlantao: '2024-07-02',
    fimPlantao: '2024-07-05',
    prescrito: true,
    converterPecunia: false,
  },
]
