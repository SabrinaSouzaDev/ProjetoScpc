/* eslint-disable no-use-before-define */
export interface NavbarItem {
  readonly id: number
  readonly title: string
  readonly url: string
  readonly permissoes?: string[]
  readonly subItems?: NavbarItem[]
  readonly icon?: object
}
