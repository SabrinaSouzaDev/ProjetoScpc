import { fireEvent, render, screen } from '@testing-library/react'
import { Select } from '../Select'

const mockHandleClick = jest.fn()

describe('Select component tests - Should', () => {
  const defaultProps = {
    title: 'Select an option',
    subtitle: 'Options',
    handleClick: mockHandleClick,
    options: [
      { title: 'Option 1', value: '1' },
      { title: 'Option 2', value: '2' },
    ],
    value: '',
  }

  test('renders correctly with all elements', () => {
    render(<Select {...defaultProps} />)

    // Verificar a renderização do componente na tela
    expect(screen.getByText('Select an option')).toBeInTheDocument()

    // Verificar se o label do componente de select renderiza na tela
    fireEvent.click(screen.getByText('Select an option'))
    expect(screen.getByText(/Select an option/i)).toBeInTheDocument()
  })

  test('renders with correct initial value', () => {
    const propsWithValue = { ...defaultProps, value: '2' }
    render(<Select {...propsWithValue} />)

    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })
})
