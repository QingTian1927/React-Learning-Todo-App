import { useEffect, useState } from 'react'
import { type Todo, statuses, priorities } from '../../types/Todo'
import { todoService } from '../../services/todoService'

type FilterBarProps = {
  originalTodos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Not Started':
      return 'bg-pastel-teal-medium text-pastel-teal-dark border-pastel-teal-dark'
    case 'In Progress':
      return 'bg-pastel-pink text-pastel-white border-pastel-pink'
    case 'Completed':
      return 'bg-pastel-turquoise text-pastel-white border-pastel-turquoise'
    default:
      return 'bg-pastel-cream text-pastel-gray-dark border-pastel-gray-medium'
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'Low':
      return 'bg-pastel-cream border-pastel-teal-dark text-pastel-teal-dark'
    case 'Medium':
      return 'bg-pastel-teal-medium border-pastel-teal-dark text-pastel-teal-dark'
    case 'High':
      return 'bg-pastel-pink border-pastel-pink text-pastel-white'
    case 'Critical':
      return 'bg-red-400 border-red-400 text-pastel-white'
    default:
      return 'bg-pastel-cream text-pastel-gray-dark border-pastel-gray-medium'
  }
}

export default function FilterBar({ originalTodos, setTodos }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      let filtered = [...originalTodos]

      if (searchTerm) {
        filtered = todoService.searchText(filtered, searchTerm)
      }

      if (statusFilter) {
        filtered = todoService.filterStatus(filtered, statusFilter)
      }

      if (priorityFilter) {
        filtered = todoService.filterPriority(filtered, priorityFilter)
      }

      console.log({ filtered })
      setTodos(filtered)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm, setTodos, originalTodos, statusFilter, priorityFilter])

  return (
    <div className='flex w-full flex-wrap items-stretch justify-end gap-2'>
      <input
        className='text-pastel-gray-dark bg-pastel-white border-pastel-turquoise outline-pastel-turquoise focus:outline-pastel-teal-dark placeholder:text-pastel-gray-medium min-w-[45%] grow rounded-full border-2 px-5 py-2'
        type='search'
        placeholder='Search Todos'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-wrap items-center gap-2'>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className={
            'cursor-pointer rounded-full border-2 px-3 py-2 font-medium outline-none ' + getStatusColor(statusFilter)
          }
        >
          <option value='' className='bg-pastel-white text-pastel-gray-dark'>
            Filter by Status
          </option>
          {statuses.map((status) => (
            <option key={status} value={status} className='bg-pastel-white text-pastel-gray-dark'>
              {status}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className={
            'cursor-pointer rounded-full border-2 px-3 py-2 font-medium outline-none ' +
            getPriorityColor(priorityFilter)
          }
        >
          <option value='' className='bg-pastel-white text-pastel-gray-dark'>
            Filter by Priority
          </option>
          {priorities.map((priority) => (
            <option key={priority} value={priority} className='bg-pastel-white text-pastel-gray-dark'>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
