type TextInputProps = {
  name: string
  placeholder?: string
  onChange: (args: { name: string; value: string }) => void
  isLongText?: boolean
}

export default function TextInput({ name, placeholder, onChange, isLongText = false }: TextInputProps) {
  const placeholderText = placeholder ? placeholder : `Enter task ${name.toLowerCase()}`
  const fieldTitle = name.charAt(0).toUpperCase() + name.substring(1)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    onChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <label className='flex w-full flex-col gap-1'>
      <span className='font-medium'>{fieldTitle}</span>
      {isLongText ? (
        <textarea
          className='bg-light-contrast min-h-36 rounded-md p-2'
          id={name}
          name={name}
          placeholder={placeholderText}
          onChange={handleChange}
        />
      ) : (
        <input
          className='bg-light-contrast rounded-md p-2'
          id={name}
          name={name}
          type='text'
          placeholder={placeholderText}
          onChange={handleChange}
        />
      )}
    </label>
  )
}
