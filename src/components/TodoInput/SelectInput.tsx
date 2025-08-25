type SelectInputProps = {
  name: string
  items: string[]
  onChange: (args: { name: string; value: string }) => void
}

export default function SelectInput({ name, items, onChange }: SelectInputProps) {
  const fieldTitle = name.charAt(0).toUpperCase() + name.substring(1)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <label className='flex w-full flex-col gap-1'>
      <span className='font-medium'>{fieldTitle}</span>

      <select
        className='bg-pastel-teal-light text-pastel-teal-dark border-pastel-teal-light rounded-md border p-2 font-semibold'
        id={name}
        name={name}
        onChange={handleChange}
      >
        {items.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
