import { PageableProps } from '@/types/PageableProps'
import { ColumnFiltersState } from '@tanstack/table-core'

export class ObjectUtils {
  static getEnumKeys(enumType: { [key: string]: string }): string[] {
    return Object.keys(enumType)
  }

  static getEnumValues(enumType: { [key: string]: string }): string[] {
    return Object.values(enumType)
  }

  static isObjectEmpty(obj: Record<string, unknown>): boolean {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false
      }
    }
    return true
  }

  static objectToFormData<T>(
    obj: T,
    formData = new FormData(),
    parentKey = '',
  ): FormData {
    for (const key in obj) {
      if (Object.hasOwn.hasOwnProperty.call(obj, key)) {
        const value = obj[key]

        const parent = Number.isNaN(Number(key))
          ? `${parentKey}.${key}`
          : `${parentKey}[${key}]`

        const fieldName = parentKey ? parent : key

        if (
          typeof value === 'object' &&
          !(value instanceof Blob) &&
          !(value instanceof File)
        ) {
          ObjectUtils.objectToFormData(value, formData, fieldName)
        } else if (value !== null && value !== undefined) {
          formData.append(fieldName, value as string | Blob)
        }
      }
    }
    return formData
  }

  static createQuery<T>(
    object?: { [s: string]: T } | ArrayLike<T>,
    pageable?: PageableProps,
  ): string {
    const objectParameters = object
      ? Object.entries(object)
          .map(([key, value]) =>
            value !== undefined ? `${key}=${value}` : undefined,
          )
          .filter((value) => value !== undefined)
      : []

    const pageableParameters = pageable
      ? ObjectUtils.createQueryPageable(pageable)
      : []

    const queryParameters = objectParameters.concat(pageableParameters)

    return queryParameters.join('&')
  }

  private static createQueryPageable(params?: PageableProps): string[] {
    const newQuery =
      params?.sort?.map((value) => {
        if (value.desc) {
          return `sort=${value.id},desc`
        } else {
          return `sort=${value.id},asc`
        }
      }) ?? []

    if (params?.page) {
      newQuery.push(`page=${params.page}`)
    }
    if (params?.size) {
      newQuery.push(`size=${params.size}`)
    }
    return newQuery
  }

  static transformToObject<T>(objects: ColumnFiltersState): T {
    const result: T = {} as T

    for (const entry of objects) {
      const keys = entry.id.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parentNode: any = result // TODO: Review this any

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        parentNode[key] = parentNode[key] || {}
        parentNode = parentNode[key]
      }

      parentNode[keys[keys.length - 1]] = entry.value
    }

    return result
  }
}
