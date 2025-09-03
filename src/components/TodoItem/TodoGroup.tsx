import { useEffect, useState } from 'react'
import type { Todo } from '../../types/Todo'
import TodoItem from './TodoItem'
import { isPastDate, isToday } from '../../utils/dateUtils'

type TodoGroupProps = {
  date: string
  todos: Todo[]
  defaultShow: boolean

  onEdit: (todo?: Todo) => void
  onToggleStatus: (todo: Todo) => Promise<boolean>
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (id: string) => Promise<boolean>
}

function countRemainingTodos(todos: Todo[]) {
  return todos.reduce((count, todo) => {
    return todo.status === 'In Progress' || todo.status === 'Not Started' ? count + 1 : count
  }, 0)
}

export default function TodoGroup({
  date,
  todos,
  defaultShow,
  onEdit,
  onToggleStatus,
  setShowInputForm,
  onDelete
}: TodoGroupProps) {
  const [showGroup, setShowGroup] = useState(defaultShow)
  const currentDate = new Date(date)

  useEffect(() => {
    setShowGroup(defaultShow)
  }, [defaultShow])

  function handleShowGroup() {
    setShowGroup((prev) => !prev)
  }

  return (
    <div className='mb-5'>
      <header className='mb-3 flex items-center justify-start gap-3 text-lg'>
        <span
          className={
            'bg-pastel-cream h-0.25 grow border-dashed ' +
            (isToday(currentDate) ? 'border-pastel-turquoise border-2' : 'border-pastel-dark-medium border-1')
          }
        ></span>
        <div>
          <span
            className={
              'mr-2 ' +
              (isToday(currentDate)
                ? 'text-pastel-turquoise font-bold'
                : isPastDate(currentDate) && countRemainingTodos(todos) > 0
                  ? 'text-pastel-pink-hover'
                  : 'text-pastel-gray-medium')
            }
          >
            {isToday(currentDate) ? 'Today' : currentDate.toLocaleDateString('en-GB')} ({countRemainingTodos(todos)}{' '}
            unfinished)
          </span>
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
        <span
          className={
            'bg-pastel-cream h-0.25 grow border-dashed ' +
            (isToday(currentDate) ? 'border-pastel-turquoise border-2' : 'border-pastel-dark-medium border-1')
          }
        ></span>
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
