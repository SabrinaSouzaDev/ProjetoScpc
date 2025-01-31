'use client'
import { DataTablePagination } from '@/components/Shared/PaginationControls'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import React, { useState } from 'react'
import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr'
import { Solicitacao } from '../ContentDatagrid'

type DataTableProps = {
  columns: ColumnDef<Solicitacao>[]
  data: Solicitacao[]
  onSolicitarPecunha?: (selectedRows: { rows: Array<Solicitacao> }) => void
  onSolicitarFolgas?: (data: { rows: Array<Solicitacao> }) => void
  selectedRowsmodel: Array<Solicitacao>
}

export function DataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    onSortingChange: setSorting,
    enableRowSelection: true, // enable row selection for all rows
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex cursor-pointer select-none flex-nowrap items-center'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {{
                          asc: <SortDescending size={24} />,
                          desc: <SortAscending size={24} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // data-state={row.getIsSelected() && 'selected'}
                  data-state={row.getIsSelected() ? 'selected' : null}
                  onClick={row.getToggleSelectedHandler()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <DataTablePagination table={table} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}
