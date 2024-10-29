'use client'
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  Ellipsis,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()
  const pageButtons = []
  // const tableSize = []

  // Paginação dinâmicamente gerada com base no número de páginas
  const generatePageButton = (pageIndex: number) => (
    <Button
      variant="outline"
      className={`hidden size-8 p-0 lg:flex ${currentPage === pageIndex ? 'disabled' : ''}`}
      key={pageIndex}
      onClick={() => {
        table.setPageIndex(pageIndex)
      }}
      disabled={currentPage === pageIndex}
    >
      {pageIndex + 1}
    </Button>
  )
  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i++) {
      pageButtons.push(generatePageButton(i))
    }
  }
  if (totalPages > 5) {
    for (let i = 0; i < totalPages; i++) {
      if (currentPage <= 3) {
        pageButtons.length = 0
        for (let j = 0; j < 5; j++) {
          pageButtons.push(generatePageButton(j))
        }
        pageButtons.push(
          <Button variant="outline" className="hidden size-8 p-0 lg:flex">
            <Ellipsis size={12} />
          </Button>,
          generatePageButton(totalPages - 1),
        )
      } else if (currentPage > 3 && currentPage < totalPages - 4) {
        pageButtons.length = 0
        pageButtons.push(
          generatePageButton(0),
          <Button variant="outline" className="hidden size-8 p-0 lg:flex">
            <Ellipsis size={12} />
          </Button>,
          generatePageButton(currentPage - 1),
          generatePageButton(currentPage),
          generatePageButton(currentPage + 1),
          <Button variant="outline" className="hidden size-8 p-0 lg:flex">
            <Ellipsis size={12} />
          </Button>,
          generatePageButton(totalPages - 1),
        )
      } else if (currentPage >= totalPages - 4) {
        pageButtons.length = 0
        pageButtons.push(
          generatePageButton(0),
          <Button variant="outline" className="hidden size-8 p-0 lg:flex">
            <Ellipsis size={12} />
          </Button>,
        )
        for (let j = totalPages - 5; j < totalPages; j++) {
          pageButtons.push(generatePageButton(j))
        }
      }
    }
  }

  return (
    <div className="flex items-center justify-end px-2 ">
      <div className="flex items-center justify-end space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-medium md:text-sm">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={5} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="flex items-center gap-1">
          <div>Páginas</div>
          <strong>
            <strong>
              {table.getState().pagination.pageIndex + 1} a{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </strong>
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Vá à página anterior</span>
            <ChevronLeft className="size-4" />
          </Button>
          {pageButtons.map((u) => u)}
          <div>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Vá à próxima página</span>
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
