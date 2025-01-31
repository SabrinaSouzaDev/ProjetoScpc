'use client'

import { DataTable } from './components/DataTable'
import { columns, data } from './mock/mockTable'

export default function Page() {
  return (
    <div className="">
      <h1 className="mb-5">Aprovação de Folgas</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
