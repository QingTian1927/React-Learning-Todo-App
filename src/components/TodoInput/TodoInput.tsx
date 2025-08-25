import { type Todo, createEmptyTodo, priorities, statuses } from '../../types/Todo'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import TagInput from './TagInput'

type TodoInputProps = {
  todo?: Todo
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  onSubmit: () => void
}

export default function TodoInput({ todo, setShowInputForm, setTodo, onSubmit }: TodoInputProps) {
  const priorityList = [...priorities]
  const statusList = [...statuses]

  function handleCloseButton() {
    setShowInputForm(false)
  }

  function handleChange(args: { name: string; value: string }) {
    const { name, value } = args
    const savedValue = name === 'duedate' ? new Date(value) : value

    setTodo((prev) => {
      const todo = prev ?? createEmptyTodo()
      return { ...todo, [name]: savedValue }
    })
  }

  function handleAddTag(tags: string[]) {
    setTodo((prev) => {
      const todo = prev ?? createEmptyTodo()
      return { ...todo, tags: [...tags] }
    })
  }

  function handleSubmitForm() {
    onSubmit()
  }

  return (
    <div className='bg-pastel-gray-dark-transparent text-pastel-gray-dark fixed top-0 left-0 z-10 flex size-full items-center justify-center'>
      <form className='bg-pastel-white flex min-h-2/3 min-w-1/2 flex-col items-center rounded-xl p-5'>
        <div className='mb-10 flex w-full items-center justify-between'>
          <h2 className='text-2xl font-bold'>{todo ? 'Edit Task' : 'Add New Task'}</h2>

          <button
            type='button'
            onClick={handleCloseButton}
            className='bg-pastel-turquoise text-pastel-gray-dark hover:bg-pastel-teal-dark flex aspect-square h-full cursor-pointer items-center justify-center rounded-lg p-2.5'
          >
            <i className='bi bi-x-lg'></i>
          </button>
        </div>

        <div className='mb-10 flex w-full flex-col gap-5'>
          <TextInput name='title' placeholder='Enter a short title for the new task' onChange={handleChange} />

          <TextInput
            name='description'
            placeholder='Enter a description for the new task'
            isLongText
            onChange={handleChange}
          />

          <div className='grid grid-cols-3 gap-5'>
            <SelectInput name='priority' items={priorityList} onChange={handleChange} />
            <SelectInput name='status' items={statusList} onChange={handleChange} />
            <DateInput name='duedate' onChange={handleChange} />
          </div>

          <TagInput onTagAdd={handleAddTag} />
        </div>

        <button
          onClick={handleSubmitForm}
          type='button'
          className='bg-pastel-pink text-pastel-white hover:bg-pastel-pink-light min-w-[5em] cursor-pointer rounded-md p-2 text-lg font-semibold'
        >
          Save
        </button>
      </form>
    </div>
  )
}
