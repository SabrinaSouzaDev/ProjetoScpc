// import { faker } from '@faker-js/faker'
// import { Solicitacao } from '../page'
// import { Payment } from '@/app/(painel)/folgas/page'
// // const range = (len: number) => {
// //   const arr: number[] = []
// //   for (let i = 0; i < len; i++) {
// //     arr.push(i)
// //   }
// //   return arr
// // }

// const newPerson = (): Solicitacao => {
//   return {
//     id: faker.number.int(),
//     selecionar: faker.datatype.boolean(),
//     nome: faker.person.fullName(),
//     qtdCredito: faker.string.octal(),
//     observacao: faker.string.octal(),
//   }
// }

// export function makeData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): Payment[] => {
//     const len = lens[depth]!
//     return Array.from({ length: len }, (): Payment => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }
//   return makeDataLevel()
// }
