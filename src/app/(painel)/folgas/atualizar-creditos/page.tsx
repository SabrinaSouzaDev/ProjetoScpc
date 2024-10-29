'use client'
import TableComponent from './components/TableComponent'
import FormComponent from './components/FormComponent'
export default function Page() {
  return (
    <div className="">
      <FormComponent suggestions={['Sugestão 1', 'Sugestão 2', 'Sugestão 3']} />
      <TableComponent />
    </div>
  )
}
