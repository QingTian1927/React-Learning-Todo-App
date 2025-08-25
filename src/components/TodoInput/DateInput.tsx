type TextInputProps = {
  name: string
  value: string
  onChange: (args: { name: string; value: string }) => void
  isRequired?: boolean
}

export default function DateInput({ name, value, onChange, isRequired = false }: TextInputProps) {
  const fieldTitle = name.charAt(0).toUpperCase() + name.substring(1)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <label className='flex w-full flex-col gap-1'>
      <span className='font-medium'>{fieldTitle}</span>
      <input
        className='bg-pastel-teal-light text-pastel-teal-dark border-pastel-teal-light rounded-md border p-2 font-semibold'
        id={name}
        name={name}
        value={value}
        type='date'
        required={isRequired}
        onChange={handleChange}
      />
    </label>
  )
}
