import { useEffect, useState, type SetStateAction } from 'react'
import type { Todo } from '../../types/Todo'
import FilterBar from './FilterBar'
import HeaderTitle from './HeaderTitle'
import ViewSwitcher from './ViewSwitcher'
import type { ViewMode } from '../../types/ViewMode'

type HeaderProps = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

  viewMode: ViewMode
  setViewMode: React.Dispatch<SetStateAction<ViewMode>>
}

export default function Header({ todos, setTodos, viewMode, setViewMode }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className='mb-5 grid min-h-[10svh] w-full grid-cols-1 items-center justify-between gap-5 rounded-md xl:grid-cols-2'>
      <HeaderTitle time={currentTime} />
      <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
      <FilterBar originalTodos={todos} setTodos={setTodos} />
    </header>
  )
}
