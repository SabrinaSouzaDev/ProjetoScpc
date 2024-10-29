export const ErrorMapping = (errorMessage: string) => {
  switch (true) {
    case errorMessage.includes('JSON parse error: Numeric value'):
      return 'Valor numérico inserido excede o limite permitido para o campo!'
    case errorMessage.includes('JSON parse error: Cannot deserialize'):
      return 'Erro na serialização do campo, informe a administração sobre o erro!'
    case errorMessage.includes('ERROR: duplicate key value'):
      return 'Informação inserida já foi solicitada anteriormente!'
    case errorMessage.includes(
      'Uma capacitação deferida ou indeferida não pode ter sua situação alterada',
    ):
    case errorMessage.includes(
      'Um relatório de plantão deferida ou indeferida não pode ter sua situação alterada.',
    ):
      return 'Relatório já atualizado anteiormente!'
    default:
      return 'Erro desconhecido'
  }
}
