import * as React from 'react'
import {
  flexRender,
  RowData,
  type Table as TanstackTable,
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/ui/data-table/data-table-pagination'
import { DataTableFilterField } from '@/types'
import { Input } from '../input'

interface DataTableProps<TData extends RowData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table?: TanstackTable<TData>
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTable<TData extends RowData>({
  table,
  filterFields,
  children,
  className,
  ...props
}: DataTableProps<TData>) {
  const rowModel = table ? table.getRowModel() : { rows: [] }
  // Memoize computation of searchableColumns and filterableColumns
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
      {children}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column.columnDef
                  const column = searchableColumns?.find(
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
            {rowModel.rows && rowModel.rows.length > 0 ? (
              rowModel?.rows.map((row) => (
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
                  colSpan={table ? table.getAllColumns().length : 0}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        {table ? <DataTablePagination table={table} /> : null}
      </div>
    </div>
  )
}
