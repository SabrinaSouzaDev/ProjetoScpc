export const formatDate = (dateStr?: string): string => {
  if (!dateStr) {
    return ''
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}$/

  if (dateRegex.test(dateStr)) {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  if (dateTimeRegex.test(dateStr)) {
    const [datePart] = dateStr.split('T')
    const [year, month, day] = datePart.split('-')
    return `${day}/${month}/${year}`
  }

  throw new Error(
    'Data inválida. O formato deve ser YYYY-MM-DD ou YYYY-MM-DDTHH:MM:SS.ssssss.',
  )
}

export const formatDateInvert = (dateUs: string): string => {
  if (!dateUs) {
    return ''
  }

  const dateData = dateUs.split('/')
  const dia = dateData[0]
  const mes = dateData[1]
  const ano = dateData[2]

  return `${ano}-${mes}-${dia}`
}
