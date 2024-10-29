import React, { useState } from 'react'

type FormProps = {
  suggestions: string[]
}

const FormComponent: React.FC<FormProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }

  return (
    <form className="max-w w-full">
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
          type="text"
          placeholder="Digite aqui..."
          aria-label="Full name"
          value={inputValue}
          onChange={handleChange}
          list="suggestions"
        />
        <datalist id="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      </div>
    </form>
  )
}

export default FormComponent
