import axios, { Axios } from 'axios'

if (process.env.NEXT_PUBLIC_API_INTRANET === undefined) {
  throw new Error('URL DA API DE INTRANET NÃO INFORMADA.')
}

if (process.env.NEXT_PUBLIC_API_SCPC_URL === undefined) {
  throw new Error('URL DA API DE SCPC NÃO INFORMADA.')
}

export const apiIntranet: string = process.env.NEXT_PUBLIC_API_INTRANET

export const apiScpc: string = process.env.NEXT_PUBLIC_API_SCPC_URL

export const apiAxiosIntranet: Axios = axios.create({
  baseURL: apiIntranet,
})

export const apiAxiosScpc: Axios = axios.create({
  baseURL: apiScpc,
})
