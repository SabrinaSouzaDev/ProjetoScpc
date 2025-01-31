export type PageableProps = {
  page?: number
  size?: number
  direction?: 'ASC' | 'DESC'
  orderBy?: string[]
  sort?: { id: string; desc: boolean }[]
}
