type Sort = {
  id: string
  desc: boolean
}

export type PageableProps = {
  page?: number
  size?: number
  direction?: 'ASC' | 'DESC'
  orderBy?: string[]
  sort?: Sort[]
}
