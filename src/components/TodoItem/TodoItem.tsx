import { type Todo } from '../../types/Todo'
import TaskActions from './TaskActions'

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  let statusIcon
  switch (todo.status) {
    case 'Not Started':
      statusIcon = '❌'
      break
    case 'In Progress':
      statusIcon = '🕒'
      break
    case 'Completed':
      statusIcon = '✅'
      break
  }

  return (
    <article className='flex flex-col items-start rounded-md bg-stone-200 p-2'>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>{todo.dueDate.toString()}</p>
      <p>{todo.priority}</p>
      <p>{statusIcon}</p>

      <TaskActions todoId={todo.id} />
    </article>
  )
}
