import { ErrorResponse } from '@/types/ErrorResponse'
import { PageableProps } from '@/types/PageableProps'
import { UnprocessableEntityError } from '@/types/UnprocessableEntityError'
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
      if (Object.hasOwn.hasOwnProperty.call(obj, key)) {
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

  /**
   * Use essa função caso seu objeto tenha o seguinte formato:
   * ```
   * {
    id: 213,
    nome: "Cartorio do Unico Oficio do Rio Araxiteua - Acará",
    cns: 67496,
    municipio.id: 3,
    municipio.nome: "ACARÁ"
    }
   * ```
  * e você espera:
  *  ```
  * {
    id: 213,
    nome: "Cartorio do Unico Oficio do Rio Araxiteua - Acará",
    cns: 67496,
    municipio: {
        id: 3,
        nome: "ACARÁ"
      }
    }
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static transformarJSON<T>(json: Record<string, any>): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const novoJSON: Record<string, any> = {}
    for (const chave in json) {
      if (Object.hasOwn.hasOwnProperty.call(json, chave)) {
        const partes = chave.split('.')
        if (partes.length === 1) {
          novoJSON[chave] = json[chave]
        } else {
          const chaveFinal = partes.pop() as string
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let objetoAtual: any = novoJSON
          partes.forEach((part) => {
            if (!objetoAtual[part]) {
              objetoAtual[part] = {}
            }
            objetoAtual = objetoAtual[part]
          })
          objetoAtual[chaveFinal] = json[chave]
        }
      }
    }
    return novoJSON as T
  }

  static converterEmptyToHifen<T>(value: T[]) {
    const newValue = value.map((r) => {
      // Itera sobre as chaves do objeto r
      for (const key in r) {
        if (typeof r[key] === 'string' && r[key] === '') {
          ;(r[key] as unknown) = '-' // Define a string vazia se o valor for uma string vazia
        }
      }
      return r // Retorna o objeto atualizado
    })
    return newValue
  }

  static transformToObject<T>(objects: ColumnFiltersState): T {
    const result: T = {} as T

    for (const entry of objects) {
      const keys = entry.id.split('.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parentNode: any = result

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        parentNode[key] = parentNode[key] || {}
        parentNode = parentNode[key]
      }

      parentNode[keys[keys.length - 1]] = entry.value
    }

    return result
  }

  /**
   * Tem como objetivo verificar se a resposta da API é um erro e lançar uma exceção
   * @param data
   * @returns
   * @throws ErrorResponse | UnprocessableEntityError
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static verificaError<T>(data: any): T {
    if (
      typeof data === 'object' &&
      'technicalMessage' in data &&
      'message' in data &&
      'internalCode' in data
    ) {
      if ('details' in data) {
        throw new UnprocessableEntityError(
          data.message,
          data.technicalMessage,
          data.internalCode,
          data.details,
        )
      } else {
        throw new ErrorResponse(
          data.message,
          data.technicalMessage,
          data.internalCode,
        )
      }
    } else {
      return data
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static removeUndefinedFields<T extends Record<string, any>>(obj: T): T {
    const cleanData = Object.entries(obj)
      .filter(([, value]) => value !== undefined && value !== null)
      .reduce(
        (obj, [key, value]) => {
          if (typeof value === 'object' && !(value instanceof File)) {
            obj[key] = ObjectUtils.removeUndefinedFields(value)
          } else {
            obj[key] = value
          }
          return obj
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as Record<string, any>,
      )

    return cleanData as T
  }
}
