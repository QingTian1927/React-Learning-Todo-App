import { type Todo } from '../../types/Todo'
import TodoItem from '../TodoItem/TodoItem'
import 'bootstrap-icons/font/bootstrap-icons.css'

type TodoListProps = {
  todos: Todo[]
  onEdit: (todo?: Todo) => void
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>

  // 2-level props passing. props are completely unused here
  // this ain't good
  onDelete: (id: string) => Promise<boolean>
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

export default function TodoList({ todos, onEdit, onDelete, setTodo, setShowInputForm }: TodoListProps) {
  return (
    <section className='grid grid-cols-2 gap-5'>
      <button
        onClick={() => {
          setShowInputForm(true)
        }}
        className='group border-pastel-turquoise hover:border-pastel-teal-dark flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-5'
      >
        <span className='text-pastel-turquoise group-hover:text-pastel-teal-dark text-4xl font-bold'>
          <i className='bi bi-plus-lg'></i>
        </span>
      </button>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </section>
  )
}
