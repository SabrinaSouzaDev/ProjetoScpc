export function objectToFormData<T>(
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
        objectToFormData(value, formData, fieldName)
      } else if (value !== null && value !== undefined) {
        formData.append(fieldName, value as string | Blob)
      }
    }
  }
  return formData
}
