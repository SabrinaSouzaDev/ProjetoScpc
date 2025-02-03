export type UnidadeAdministrativaType = "COORDENADORIA" | "DIRETORIA" | "NUCLEO" | "CONTROLE INTERNO" | "CONTROLE_INTERNO" | "NUPLAN" | "SUBDEFENSORIA" | "FINANCEIRO" | "GGP" | "GERENCIA"

export const unidadeAdministrativaMap: { [key in UnidadeAdministrativaType]: string } = {
  COORDENADORIA: "Coordenadoria",
  DIRETORIA: "Diretoria",
  NUCLEO: "Núcleo",
  "CONTROLE INTERNO": "Controle Interno",
  "CONTROLE_INTERNO": "Controle Interno",
  NUPLAN: "Nuplan",
  SUBDEFENSORIA: "Subdefensoria",
  FINANCEIRO: "Financeiro",
  GGP: "GGP",
  GERENCIA: "Gerência",
}

interface UnidadeAdministrativaChipProps {
  unidade: UnidadeAdministrativaType;
}

export function UnidadeAdministrativaChip({ unidade }: UnidadeAdministrativaChipProps) {
  const unidadeNome = unidadeAdministrativaMap[unidade];
  let className

  switch (unidadeNome) {
    case 'Coordenadoria':
      className =
        'flex items-center justify-center text-white bg-yellow-700 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Diretoria':
      className =
        'flex items-center justify-center text-white bg-orange-600 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Núcleo':
      className =
        'flex items-center justify-center text-white bg-green-500 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Controle Interno':
      className =
        'flex items-center justify-center text-white bg-red-500 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Nuplan':
      className =
        'flex items-center justify-center text-white bg-red-700 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Financeiro':
      className =
        'flex items-center justify-center text-white bg-primary w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'GGP':
      className =
        'flex items-center justify-center text-white bg-purple-700 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Gerência':
      className =
        'flex items-center justify-center text-white bg-cyan-700 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    case 'Subdefensoria':
      className =
        'flex items-center justify-center text-white bg-blue-700 w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
      break
    default:
      className =
        'flex items-center justify-center text-white bg-primary w-full max-w-[8rem] text-center h-9 rounded-full text-wrap overflow-hidden text-[0.8rem] overflow-ellipsis'
  }

  return (
    <div
      className={`flex justify-center items-center text-center max-w-[8rem] w-fit rounded-xl p-2 bg-${className}`}
    >
      {unidadeNome}
    </div>
  );
}

