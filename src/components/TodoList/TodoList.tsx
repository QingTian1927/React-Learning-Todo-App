import { type Todo } from '../../types/Todo'
import TodoItem from '../TodoItem/TodoItem'
import 'bootstrap-icons/font/bootstrap-icons.css'

type TodoListProps = {
  todos: Todo[]
  onEdit: (todo?: Todo) => void
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoList({ todos, onEdit, setShowInputForm }: TodoListProps) {
  return (
    <section className='grid grid-cols-2 gap-5'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      <button
        onClick={() => {
          setShowInputForm(true)
        }}
        className='add-todo-btn flex cursor-pointer items-center justify-center rounded-lg p-5'
      >
        <span className='text-5xl font-bold'>
          <i className='bi bi-plus-lg'></i>
        </span>
      </button>
    </section>
  )
}
