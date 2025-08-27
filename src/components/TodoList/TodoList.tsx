import { type Todo } from '../../types/Todo'
import TodoItem from '../TodoItem/TodoItem'

type TodoListProps = {
  todos: Todo[]
  onEdit: (todo?: Todo) => void
  onToggleStatus: (todo: Todo) => Promise<boolean>
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>

  // 2-level props passing. props are completely unused here
  // this ain't good
  onDelete: (id: string) => Promise<boolean>
}

export default function TodoList({ todos, onEdit, onDelete, onToggleStatus, setShowInputForm }: TodoListProps) {
  return (
    <div>
      {todos.length <= 0 && (
        <div className='mb-10 flex min-h-50 flex-col items-center justify-center gap-2 text-center'>
          <div className='text-pastel-teal-dark text-[10em]'>
            <i className='bi bi-stickies'></i>
          </div>

          <div>
            <p className='text-pastel-teal-dark mb-2 text-2xl font-medium'>You currently don't have any todos.</p>
            <p className='text-pastel-gray-medium text-lg italic'>Add one using the '+' button below</p>
          </div>
        </div>
      )}

      <section className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <button
          onClick={() => {
            setShowInputForm(true)
          }}
          className='group border-pastel-turquoise hover:border-pastel-teal-dark flex min-h-50 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-5'
        >
          <span className='text-pastel-turquoise group-hover:text-pastel-teal-dark text-4xl font-bold'>
            <i className='bi bi-plus-lg'></i>
          </span>
        </button>

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
            setShowInputForm={setShowInputForm}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </section>
    </div>
  )
}
