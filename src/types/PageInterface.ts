export type PageInterface<T> = {
  totalPages: number
  totalElements: number
  size: number
  content?: T[]
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  pageable: {
    offset: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export function createNoDataPage<T>(): PageInterface<T> {
  const noDataPage: PageInterface<T> = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    number: 0,
    content: [],
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    pageable: {
      offset: 0,
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      unpaged: false,
    },
    first: false,
    last: false,
    numberOfElements: 0,
    empty: true,
  }
  return noDataPage
}
