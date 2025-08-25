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
          className='bg-light-contrast rounded-md p-2'
          id='tag'
          name='tag'
          type='text'
          placeholder='Enter some tags for the new task'
          onKeyDown={handleEnterKey}
        />
      </label>

      <div className='bg-light-contrast flex min-h-24 flex-wrap items-start justify-start gap-2 rounded-md p-2'>
        {displayTags.length > 0 ? (
          displayTags.map((tag, i) => (
            <div className='bg-invert text-invert min-w-[4em] rounded-md px-2 py-1.5 text-center' key={i}>
              <span className='mr-2'>{tag}</span>

              <button
                type='button'
                className='btn-x-invert'
                onClick={() => {
                  setDisplayTags((prev) => prev.filter((otherTag) => otherTag !== tag))
                }}
              >
                <i className='bi bi-x-lg'></i>
              </button>
            </div>
          ))
        ) : (
          <span className='text-dimmed'>This task doesn't have any tags yet</span>
        )}
      </div>
    </>
  )
}
