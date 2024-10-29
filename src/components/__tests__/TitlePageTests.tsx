import { render, screen } from '@testing-library/react'
import { TitlePage } from '../TitlePage'

describe('TitlePage component test - Should', () => {
  const defaultProps = {
    title: 'Título da Página',
  }

  it('renders the component on screen and title should be equal to props title', () => {
    render(<TitlePage {...defaultProps} />)
    expect(screen.getByText('Título da Página')).toBeInTheDocument()
  })

  it('not renders wrong title on screen', () => {
    render(<TitlePage title="right title" />)
    expect(screen.queryByText('wrong title')).not.toBeInTheDocument()
  })

  it('renders the Route icon', () => {
    const { container } = render(<TitlePage {...defaultProps} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('update text size when screen will be reduced', () => {
    render(<TitlePage {...defaultProps} />)

    expect(screen.getByText('Título da Página')).toHaveClass(
      'text-[1.2rem] sm:text-[1.8rem] md:text-[2.2rem]',
    )
  })
})
