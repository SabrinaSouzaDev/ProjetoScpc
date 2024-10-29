// DateInputField.tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DateInputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function DateInputField({
  label,
  value,
  onChange,
  disabled,
}: DateInputFieldProps) {
  return (
    <div
      style={{
        marginBottom: '16px',
        display: 'inline-block',
        marginRight: '10px',
      }}
    >
      <Label>{label}</Label>
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}
