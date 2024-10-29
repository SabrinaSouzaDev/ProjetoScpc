export function verificaPermissaoSideBar(
  permissoes?: string[] | null,
  permissoesNecessarias?: string[],
) {
  if (permissoesNecessarias === undefined) {
    return true
  }

  return permissoes?.some((permissao) =>
    permissoesNecessarias.includes(permissao),
  )
}
