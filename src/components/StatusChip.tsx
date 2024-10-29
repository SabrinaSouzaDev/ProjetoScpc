interface statusChipProps {
  status: string
}

export function StatusChip({ status }: statusChipProps) {
  let className

  switch (status) {
    case 'SOLICITADO':
      className =
        'pl-4 pr-4 text-white bg-yellow-500 w-full max-w-24 text-center h-10 rounded-full text-wrap overflow-hidden overflow-ellipsis'
      break
    case 'DEVOLVIDO':
      className =
        'pl-4 pr-4 text-white bg-orange-600 w-full max-w-24 text-center h-10 rounded-full text-wrap overflow-hidden overflow-ellipsis'
      break
    case 'DEFERIDO':
      className =
        'pl-4 pr-4 text-white bg-green-500 w-full max-w-24 text-center h-10 rounded-full text-wrap overflow-hidden overflow-ellipsis'
      break
    case 'INDEFERIDO':
      className =
        'pl-4 pr-4 text-white bg-red-500 w-full max-w-24 text-center h-10 rounded-full text-wrap overflow-hidden overflow-ellipsis'
      break
    default:
      className =
        'text-white bg-primary w-full max-w-24 text-center h-10 rounded-full text-wrap overflow-hidden overflow-ellipsis'
  }

  return (
    <div className={className}>
      <h1 className="text-[0.7rem]">{status || 'Pendente'}</h1>
    </div>
  )
}
