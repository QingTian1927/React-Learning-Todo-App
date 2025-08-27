import { useEffect, useState } from 'react'
import type { Todo } from '../../types/Todo'
import FilterBar from './FilterBar'
import HeaderTitle from './HeaderTitle'

type HeaderProps = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function Header({ todos, setTodos }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className='mb-5 grid min-h-[10svh] w-full grid-cols-2 items-center justify-between gap-2 gap-5 rounded-md'>
      <HeaderTitle time={currentTime} />
      <FilterBar originalTodos={todos} setTodos={setTodos} />
    </header>
  )
}
