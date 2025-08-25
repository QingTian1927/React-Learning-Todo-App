import { type Todo, createEmptyTodo, priorities, statuses } from '../../types/Todo'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import TagInput from './TagInput'
import { useEffect, useState } from 'react'

type TodoInputProps = {
  todo?: Todo | null
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  onSubmit: (todo: Todo) => Promise<boolean>
}

function formatTimeValue(date: Date): string {
  return date.toISOString().split('T')[0]
}

function isValidFormData(formData: Todo): boolean {
  if (!formData.title || formData.title === '') {
    alert('Task title must not be empty')
    return false
  }

  if (!formData.description || formData.description === '') {
    alert('Task description must not be empty')
    return false
  }

  if (!formData.dueDate) {
    alert('Task due date must not be empty')
    return false
  }
  return true
}

export default function TodoInput({ todo, setShowInputForm, setTodo, onSubmit }: TodoInputProps) {
  const [formData, setFormData] = useState<Todo>(todo ?? createEmptyTodo())

  useEffect(() => {
    if (todo) {
      setFormData(todo)
    }
  }, [todo])

  const priorityList = [...priorities]
  const statusList = [...statuses]

  function handleCloseButton() {
    setShowInputForm(false)
    setTodo(null)
  }

  function handleChange(args: { name: string; value: string }) {
    const { name, value } = args
    const newValue = name === 'dueDate' ? new Date(value) : value

    setFormData((prev) => {
      return { ...prev, [name]: newValue }
    })
  }

  function handleChangeTag(newTags: string[]) {
    setFormData((prev) => {
      return { ...prev, tags: [...newTags] }
    })
  }

  async function handleSubmitForm() {
    if (!isValidFormData(formData)) {
      return
    }

    const result = await onSubmit(formData)
    if (result) {
      setShowInputForm(false)
      setTodo(null)
    }
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
          <TextInput
            name='title'
            placeholder='Enter a short title for the new task'
            onChange={handleChange}
            value={formData.title ?? ''}
            isRequired={true}
          />

          <TextInput
            name='description'
            value={formData.description ?? ''}
            placeholder='Enter a description for the new task'
            isLongText
            onChange={handleChange}
            isRequired={true}
          />

          <div className='grid grid-cols-3 gap-5'>
            <SelectInput
              name='priority'
              items={priorityList}
              onChange={handleChange}
              value={formData.priority ?? priorityList[0]}
              isRequired={true}
            />
            <SelectInput
              name='status'
              items={statusList}
              onChange={handleChange}
              value={formData.status ?? statusList[0]}
              isRequired={true}
            />
            <DateInput
              name='dueDate'
              onChange={handleChange}
              value={formData.dueDate ? formatTimeValue(formData.dueDate) : ''}
              isRequired={true}
            />
          </div>

          <TagInput value={formData.tags ?? []} onChange={handleChangeTag} />
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
