export const handleError = async (resp: Response) => {
  if (!resp.ok) {
    const errorData = await resp.json()
    const errorMessage = `Error ${resp.status}: ${errorData.technicalMessage || errorData.message || resp.statusText}`
    switch (resp.status) {
      case 400:
        throw new Error(`Solicitação inválida: ${errorMessage}`)
      case 401:
        throw new Error(`Não autorizado: ${errorMessage}`)
      case 404:
        throw new Error(`Não encontrada: ${errorMessage}`)
      case 409:
        throw new Error(`Conflito: ${errorMessage}`)
      case 412:
        throw new Error(`Condição falhou: ${errorMessage}`)
      case 422:
        throw new Error(
          `Entidade não processável: ${JSON.stringify(errorData)}`,
        )
      case 500:
        throw new Error(`Erro interno do servidor: ${errorMessage}`)
      default:
        throw new Error(`Erro Inesperado: ${errorMessage}`)
    }
  }
}
