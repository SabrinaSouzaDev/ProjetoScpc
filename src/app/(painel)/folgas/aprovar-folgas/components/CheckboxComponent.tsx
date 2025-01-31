import { useState } from 'react'

const CheckboxComponent: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => setIsChecked(!isChecked)

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="form-checkbox mr-2 size-6"
      />
    </div>
  )
}

export default CheckboxComponent
