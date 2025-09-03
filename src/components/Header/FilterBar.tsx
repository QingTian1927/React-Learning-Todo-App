import { useEffect, useState } from 'react'
import { type Todo, statuses, priorities } from '../../types/Todo'
import { todoService } from '../../services/todoService'

type FilterBarProps = {
  originalTodos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
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

      <div className='flex items-center gap-2'>
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className='text-pastel-white bg-pastel-turquoise border-pastel-turquoise rounded-full border-2 px-3 py-2 font-medium'
        >
          <option value=''>Filter by Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setPriorityFilter(e.target.value)}
          className='text-pastel-white bg-pastel-turquoise border-pastel-turquoise rounded-full border-2 px-3 py-2 font-medium'
        >
          <option value=''>Filter by Priority</option>
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
