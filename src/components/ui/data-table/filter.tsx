import { Column } from '@tanstack/react-table'

type FilterProps<TData> = {
  column: Column<TData, unknown>
}

function Filter<TData>({ column }: FilterProps<TData>) {
  return (
    <input
      type="text"
      placeholder={`Filtrar ${String(column.id)}`}
      value={(column.getFilterValue() as string) || ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      className="h-8 w-full lg:w-64"
    />
  )
}

export default Filter
