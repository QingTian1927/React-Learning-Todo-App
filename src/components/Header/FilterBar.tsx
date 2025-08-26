import { useEffect, useState } from 'react'
import type { Todo } from '../../types/Todo'
import { todoService } from '../../services/todoService'

type FilterBarProps = {
  originalTodos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function FilterBar({ originalTodos, setTodos }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm === '') {
        setTodos(originalTodos)
        return
      }

      const filtered = todoService.searchText([...originalTodos], searchTerm)
      console.log({ filtered })
      setTodos(filtered)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm, setTodos, originalTodos])

  return (
    <input
      className='text-pastel-gray-dark bg-pastel-white border-pastel-turquoise outline-pastel-turquoise focus:outline-pastel-teal-dark placeholder:text-pastel-gray-medium h-full min-w-[45%] rounded-full border-2 px-5 py-2'
      type='search'
      placeholder='Search Todos'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
