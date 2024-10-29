import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableWithouData() {
  return (
    <Table className="rounded-md border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            Falha na requisição de dados. Tente Logar novamente, caso o erro
            persista entre em contato com O Bruna da Dpe Assis
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={100} className="h-24 text-center">
            Sem informações para exibir.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
