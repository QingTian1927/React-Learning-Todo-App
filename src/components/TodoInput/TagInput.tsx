import { useState } from 'react'

type TagInputProps = {
  onTagAdd: (tags: string[]) => void
}

export default function TagInput({ onTagAdd }: TagInputProps) {
  const [displayTags, setDisplayTags] = useState<string[]>([])

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()

      const value = e.currentTarget.value.trim()
      if (value === '') {
        alert('Tag cannot be empty! Please try again.')
        return
      }

      if (displayTags.includes(value)) {
        alert('Tag already exists! Please enter a different tag.')
        return
      }

      const newTags = [...displayTags, value]
      setDisplayTags(newTags)
      onTagAdd(newTags)

      e.currentTarget.value = ''
    }
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
        {displayTags.length > 0 ? (
          displayTags.map((tag, i) => (
            <div
              className='bg-pastel-teal-dark text-pastel-white min-w-[4em] rounded-md px-2 py-1.5 text-center font-medium'
              key={i}
            >
              <span className='mr-2'>{tag}</span>

              <button
                type='button'
                className='text-pastel-white hover:text-pastel-gray-dark cursor-pointer'
                onClick={() => {
                  setDisplayTags((prev) => prev.filter((otherTag) => otherTag !== tag))
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
