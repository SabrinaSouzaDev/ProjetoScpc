export type NavbarSubItem = {
  readonly id: number
  readonly permissoes: string[]
  readonly subtitle: string
  readonly suburl: string
  readonly icon: JSX.Element
}
export type NavbarItem = {
  readonly id: number
  readonly permissoes: string[]
  readonly title: string
  readonly url: string
  readonly icon: JSX.Element
  readonly subItems: NavbarSubItem[]
}
