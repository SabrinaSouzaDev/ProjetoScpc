import { render, screen } from '@testing-library/react'
import RequestTable from '../RequestTable'

describe('RequestTable component tests - Should', () => {
  const defaultProps = {
    title: 'Testando a renderização da tabela',
    solicitationDate: '01/01/2000',
    applicant: 'Otavinho',
    sector: 'Scpc',
    process: 'teste',
    typeOfPaymente: 'Integral',
    situation: 'Pendente',
    transportType: 'Onibus',
  }

  it('render the component: RequestTable, on the screen ', () => {
    render(<RequestTable {...defaultProps} />)
    expect(
      screen.getByText('Testando a renderização da tabela'),
    ).toBeInTheDocument()
  })

  it('renders the title and solicitation date', () => {
    render(<RequestTable {...defaultProps} />)

    expect(
      screen.getByText('Testando a renderização da tabela'),
    ).toBeInTheDocument()
    expect(screen.getByText('01/01/2000')).toBeInTheDocument()
  })

  it('renders the process with Badge component', () => {
    render(<RequestTable {...defaultProps} />)

    expect(screen.getAllByText(/teste/)).toHaveLength(2)
    expect(screen.getAllByText(/teste/)[0]).toHaveClass('bg-red-600 text-white')
  })

  it('renders the children content if provided', () => {
    render(
      <RequestTable {...defaultProps}>
        <div>Conteúdo Adicional</div>
      </RequestTable>,
    )

    expect(screen.getByText('Conteúdo Adicional')).toBeInTheDocument()
  })

  it('does not render children if not provided', () => {
    render(<RequestTable {...defaultProps} />)

    expect(screen.queryByText('Conteúdo Adicional')).not.toBeInTheDocument()
  })
})
