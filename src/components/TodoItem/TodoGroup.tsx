import { useState } from 'react'
import type { Todo } from '../../types/Todo'
import TodoItem from './TodoItem'

type TodoGroupProps = {
  date: string
  todos: Todo[]

  onEdit: (todo?: Todo) => void
  onToggleStatus: (todo: Todo) => Promise<boolean>
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (id: string) => Promise<boolean>
}

export default function TodoGroup({ date, todos, onEdit, onToggleStatus, setShowInputForm, onDelete }: TodoGroupProps) {
  const [showGroup, setShowGroup] = useState(true)

  function handleShowGroup() {
    setShowGroup((prev) => !prev)
  }

  return (
    <div className='mb-5'>
      <header className='mb-3 flex items-center justify-start gap-3 text-xl font-semibold'>
        <span className='bg-pastel-gray-medium h-0.5 grow'></span>
        <div>
          <span className='text-pastel-gray-dark mr-2'>{new Date(date).toLocaleDateString('en-GB')}</span>
          <button
            onClick={handleShowGroup}
            className='hover:bg-pastel-white h-full cursor-pointer rounded-md px-2 py-1'
          >
            {showGroup ? (
              <i className='bi bi-chevron-up text-pastel-gray-dark'></i>
            ) : (
              <i className='bi bi-chevron-down text-pastel-gray-dark'></i>
            )}
          </button>
        </div>
        <span className='bg-pastel-gray-medium h-0.5 grow'></span>
      </header>

      {showGroup && (
        <div className='flex flex-col gap-3'>
          {(todos as Todo[]).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              setShowInputForm={setShowInputForm}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}
