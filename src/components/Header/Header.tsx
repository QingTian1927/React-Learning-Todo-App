import type { Todo } from '../../types/Todo'
import FilterBar from './FilterBar'
import HeaderTitle from './HeaderTitle'
import ViewSwitcher from './ViewSwitcher'

type HeaderProps = {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

function getCurrentTime(): string {
  const now = new Date()
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now)
}

export default function Header({ todos, setTodos }: HeaderProps) {
  return (
    <header className='mb-5 flex min-h-[10svh] w-full items-center justify-between gap-2 rounded-md'>
      <HeaderTitle time={getCurrentTime()} />
      <FilterBar originalTodos={todos} setTodos={setTodos} />
      <ViewSwitcher />
    </header>
  )
}
