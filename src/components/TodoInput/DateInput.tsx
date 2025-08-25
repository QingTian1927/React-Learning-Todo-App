type TextInputProps = {
  name: string
  onChange: (args: { name: string; value: string }) => void
}

export default function DateInput({ name, onChange }: TextInputProps) {
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
        type='date'
        onChange={handleChange}
      />
    </label>
  )
}
