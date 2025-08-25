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
      <input className='bg-light-contrast rounded-md p-2' id={name} name={name} type='date' onChange={handleChange} />
    </label>
  )
}
