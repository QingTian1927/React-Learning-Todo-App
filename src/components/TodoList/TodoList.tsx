import { type Todo } from '../../types/Todo'
import type { ViewMode } from '../../types/ViewMode'
import TodoGroup from '../TodoItem/TodoGroup'
import TodoItem from '../TodoItem/TodoItem'

type TodoListProps = {
  todos: Todo[]
  onEdit: (todo?: Todo) => void
  onToggleStatus: (todo: Todo) => Promise<boolean>
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>

  viewMode: ViewMode
  showAll: boolean

  // 2-level props passing. props are completely unused here
  // this ain't good
  onDelete: (id: string) => Promise<boolean>
}

function groupTodosByDueDate(todos: Todo[]) {
  return todos.reduce<Record<string, Todo[]>>((groups, todo) => {
    const key = todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : 'No Due Date'

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(todo)
    return groups
  }, {})
}

export default function TodoList({
  todos,
  onEdit,
  onDelete,
  onToggleStatus,
  setShowInputForm,
  viewMode,
  showAll
}: TodoListProps) {
  let todoGroups = {}
  if (viewMode === 'list') {
    todoGroups = groupTodosByDueDate(todos)
  }

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

      <section className={'grid grid-cols-1 gap-5 ' + (viewMode === 'grid' && 'md:grid-cols-2')}>
        <button
          onClick={() => {
            setShowInputForm(true)
          }}
          className='group border-pastel-turquoise hover:border-pastel-teal-dark flex min-h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-5 transition-colors duration-200 ease-in-out'
        >
          <span className='text-pastel-turquoise group-hover:text-pastel-teal-dark text-4xl font-bold transition-colors duration-200 ease-in-out'>
            <i className='bi bi-plus-lg'></i>
          </span>
        </button>

        {viewMode === 'grid' &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
              setShowInputForm={setShowInputForm}
              onToggleStatus={onToggleStatus}
            />
          ))}

        {viewMode === 'list' &&
          Object.entries(todoGroups).map(([date, todos]) => (
            <TodoGroup
              defaultShow={showAll}
              key={date}
              date={date}
              todos={todos as Todo[]}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              setShowInputForm={setShowInputForm}
              onDelete={onDelete}
            />
          ))}
      </section>
    </div>
  )
}
