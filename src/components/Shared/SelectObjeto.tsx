import React from 'react'

interface Option {
  id: number
  title: string
}

interface CustomSelectProps {
  options: Option[]
  value: string // Tipo string para o valor selecionado
  onChange: (selectedValue: string) => void // Callback para mudança
  label: string // Texto do rótulo
  subtitle?: string // Texto do subtítulo (opcional)
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  subtitle,
}) => {
  return (
    <div>
      <label className="block text-[0.8rem] font-medium">{label}</label>
      {subtitle && <p className="text-[0.7rem] text-gray-600">{subtitle}</p>}
      <select
        value={value}
        onChange={(e) => {
          const selectedId = parseInt(e.target.value)
          const selectedOption = options.find(
            (option) => option.id === selectedId,
          )
          onChange(selectedOption?.title || '') // Chame a função onChange com o valor selecionado
        }}
        className="w-full"
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
