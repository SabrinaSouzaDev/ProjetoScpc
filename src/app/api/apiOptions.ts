import axios, { Axios } from 'axios'

if (process.env.NEXT_PUBLIC_API_SCPC_URL === undefined) {
  throw new Error('SCPc_URL NÃO INFORMADA.')
}

export const apiAddress: string = process.env.NEXT_PUBLIC_API_SCPC_URL
export const apiAxios: Axios = axios.create({
  baseURL: apiAddress,
})
