export const formatDate = (dateStr?: string): string => {
  if (!dateStr) {
    return ''
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}$/

  try {
    if (dateRegex.test(dateStr)) {
      const [year, month, day] = dateStr.split('-')
      return `${day}/${month}/${year}`
    }

    if (dateTimeRegex.test(dateStr)) {
      const [datePart] = dateStr.split('T')
      const [year, month, day] = datePart.split('-')
      return `${day}/${month}/${year}`
    }

    throw new Error('Formato de data inválido')
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'Data inválida'
  }
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
