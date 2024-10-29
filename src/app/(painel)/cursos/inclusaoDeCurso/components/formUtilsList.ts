// import { ListOptions } from "@/components/Select";

import { ListOptions } from '@/components/Select'

// Interface para os itens das listas
// export interface ListItem {
//   title: string
//   value?:string
// }
export const KnowledgeList: ListOptions[] = [
  {
    title: 'Administração',
    value: '1',
  },
  {
    title: 'Engenharia',
    value: '2',
  },
  {
    title: 'Tecnologia',
    value: '3',
  },
  {
    title: 'Saúde',
    value: '4',
  },
  {
    title: 'Psicologia',
    value: '5',
  },
  {
    title: 'Educação',
    value: '6',
  },
  {
    title: 'Direito',
    value: '7',
  },
  {
    title: 'Artes e Letras',
    value: '8',
  },
  {
    title: 'Ciências Sociais',
    value: '9',
  },
  {
    title: 'Ciências Exatas',
    value: '10',
  },
]

export const EventTypeList: ListOptions[] = [
  {
    title: 'Palestra',
    value: '1',
  },
  {
    title: 'Workshop',
    value: '2',
  },
  {
    title: 'Seminário',
    value: '3',
  },
  {
    title: 'Conferência',
    value: '4',
  },
  {
    title: 'Curso',
    value: '5',
  },
  {
    title: 'Treinamento',
    value: '6',
  },
  {
    title: 'Simpósio',
    value: '7',
  },
  {
    title: 'Mesa Redonda',
    value: '8',
  },
]

export const EventList: ListOptions[] = [
  {
    title: 'Presencial',
    value: '1',
  },
  {
    title: 'Online',
    value: '2',
  },
  {
    title: 'Híbrido',
    value: '3',
  },
]

// interface KnowledgeListType {
//   [key: string]: { id: number };
// }

// export const KnowledgeList: KnowledgeListType = {
//   Administracao: { id: 1 },
//   Engenharia: { id: 2 },
//   Tecnologia: { id: 3 },
//   Saude: { id: 4 },
//   Psicologia: { id: 5 },
//   Educacao: { id: 6 },
//   Direito: { id: 7 },
//   "Artes e Letras": { id: 8 },
//   "Ciencias Sociais": { id: 9 },
//   "Ciencias Exatas": { id: 10 },
// };

// export const EventTypeList = {
//   Palestra: { id: 1 },
//   Workshop: { id: 2 },
//   Seminario: { id: 3 },
//   Conferencia: { id: 4 },
//   Curso: { id: 5 },
//   Treinamento: { id: 6 },
//   Simposio: { id: 7 },
//   "Mesa Redonda": { id: 8 },
// };

// export const EventList = {
//   Presencial: { id: 1 },
//   Online: { id: 2 },
//   Hibrido: { id: 3 },
// };

// interface EventType {
//   id: number;
//   title: string;
//   value: number;
// }

// // Exemplo de lista de tipos de eventos

// // Convertendo EventTypeList para um array de opções

// // export const knowledgeOptions: EventType[] = Object.entries(KnowledgeList).map(
// //   ([title, { id }]) => ({
// //     id,
// //     title,
// //     value: String(id), // Adiciona a propriedade value como string
// //   })
// // );
// export const EventListOptions: listItemSchemaType[] = Object.entries(EventList).map(([key, value]) => ({title: key, id: value.id}));
// export const EventTypeListOptions: listItemSchemaType[] = Object.entries(EventTypeList).map(([key, value]) => ({title: key, id: value.id}));
// export const KnowledgeListOptions: listItemSchemaType[] = Object.entries(KnowledgeList).map(([key, value]) => ({title: key, id: value.id}));
