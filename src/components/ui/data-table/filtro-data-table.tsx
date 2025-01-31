import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/ui/data-table/data-table-pagination'
import {
  ColumnDef,
  flexRender,
  RowData,
  type Table as TanstackTable,
} from '@tanstack/react-table'
import { DataTableFilterField } from '@/types'
import { Input } from '../../Shared/input'
import { cn } from '@/lib/utils'

interface DataTableProps<TData extends RowData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>
  filterFields?: DataTableFilterField<TData>[]
  columns?: ColumnDef<TData>[] // Adicionei columns como propriedade opcional
}

export function DataTableFilter<TData extends RowData>({
  table,
  filterFields,
  className,
  ...props
}: DataTableProps<TData>) {
  const rowModel = table.getRowModel()

  const { searchableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields?.filter((field) => !field.options) ?? [],
    }
  }, [filterFields])

  return (
    <div
      className={cn('w-full space-y-2.5 overflow-auto', className)}
      {...props}
    >
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column.columnDef
                  const column = searchableColumns.find(
                    (column) => column.value === header.id,
                  )
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(columnDef.header, header.getContext())}
                      {column && (
                        <Input
                          placeholder={column.placeholder}
                          value={
                            (table
                              .getColumn(String(column.value))
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(event) =>
                            table
                              .getColumn(String(column.value))
                              ?.setFilterValue(event.target.value)
                          }
                          className="h-8 w-40 lg:w-64"
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rowModel.rows.length > 0 ? (
              rowModel.rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-left" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
