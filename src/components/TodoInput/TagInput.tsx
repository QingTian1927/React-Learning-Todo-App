type TagInputProps = {
  value: string[]
  onChange: (tags: string[]) => void
}

export default function TagInput({ value: tags, onChange }: TagInputProps) {
  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = e.currentTarget
      const newTag = input.value.trim()

      if (!newTag) {
        alert('Tag cannot be empty! Please try again.')
        return
      }

      if (tags.includes(newTag)) {
        alert('Tag already exists! Please enter a different tag.')
        return
      }

      onChange([...tags, newTag])
      input.value = ''
    }
  }

  function handleRemoveTag(removedTag: string) {
    onChange(tags.filter((tag) => tag !== removedTag))
  }

  return (
    <>
      <label className='flex w-full flex-col gap-1'>
        <span className='font-medium'>Tags</span>
        <input
          className='bg-pastel-white text-pastel-gray-dark border-pastel-turquoise outline-pastel-turquoise focus:outline-pastel-teal-dark placeholder:text-pastel-gray-medium rounded-md border-2 p-2'
          id='tag'
          name='tag'
          type='text'
          placeholder='Enter some tags for the new task'
          onKeyDown={handleEnterKey}
        />
      </label>

      <div className='bg-pastel-teal-light border-pastel-teal-light text-pastel-teal-dark flex min-h-24 flex-wrap items-start justify-start gap-2 rounded-md border-2 p-2'>
        {tags.length > 0 ? (
          tags.map((tag, i) => (
            <div
              className='bg-pastel-teal-dark text-pastel-white min-w-[4em] rounded-md px-2 py-1.5 text-center font-medium'
              key={i}
            >
              <span className='mr-2'>{tag}</span>

              <button
                type='button'
                className='text-pastel-white hover:text-pastel-gray-dark cursor-pointer'
                onClick={() => {
                  handleRemoveTag(tag)
                }}
              >
                <i className='bi bi-x-lg'></i>
              </button>
            </div>
          ))
        ) : (
          <span className='text-pastel-gray-medium'>This task doesn't have any tags yet</span>
        )}
      </div>
    </>
  )
}
