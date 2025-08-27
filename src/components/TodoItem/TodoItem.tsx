import { type Priority, type Status, statuses, type Todo } from '../../types/Todo'

type TodoItemProps = {
  todo: Todo
  onDelete: (id: string) => Promise<boolean>
  onEdit: (todo?: Todo) => void
  onToggleStatus: (todo: Todo) => Promise<boolean>
  setShowInputForm: React.Dispatch<React.SetStateAction<boolean>>
}

function formatTime(date?: Date): string {
  return new Intl.DateTimeFormat('en-UK').format(date)
}

function isOverdue(dueDate: Date): boolean {
  const now = new Date()

  // Reset time part to 00:00:00 for both dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())

  return today > due
}

function getStatusColor(status: Status): string {
  switch (status) {
    case 'Not Started':
      return 'bg-pastel-teal-light text-pastel-teal-dark border-pastel-teal-light'
    case 'In Progress':
      return 'bg-pastel-pink text-pastel-white border-pastel-pink'
    case 'Completed':
      return 'bg-pastel-turquoise text-pastel-white border-pastel-turquoise'
  }
}

function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'Low':
      return 'bg-pastel-cream border-pastel-teal-medium text-pastel-teal-dark'
    case 'Medium':
      return 'bg-pastel-teal-light border-pastel-teal-light text-pastel-teal-dark'
    case 'High':
      return 'bg-pastel-pink border-pastel-pink text-pastel-white'
    case 'Critical':
      return 'bg-red-400 border-red-400 text-pastel-white'
  }
}

export default function TodoItem({ todo, onDelete, onEdit, onToggleStatus, setShowInputForm }: TodoItemProps) {
  async function handleDelete() {
    const confirmation = confirm(`Are you sure you want to delete the task "${todo.title}"?`)
    if (confirmation) {
      await onDelete(todo.id)
    }
  }

  function handleEdit() {
    onEdit(todo)
    setShowInputForm(true)
  }

  async function handleToggleStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    await onToggleStatus({ ...todo, status: e.target.value as Status })
  }

  return (
    <article className='bg-pastel-white flex min-h-50 flex-col items-start justify-start gap-5 rounded-lg p-5'>
      <header className='flex w-full justify-between'>
        <h3 className='text-2xl font-semibold'>{todo.title}</h3>

        <div
          className={
            'flex min-w-[5em] items-center justify-center rounded-full border-2 px-2 text-sm font-medium ' +
            getPriorityColor(todo.priority)
          }
        >
          <span>{todo.priority}</span>
        </div>
      </header>

      <div className='grow'>
        <p className='mb-5'>{todo.description}</p>

        <div className='flex flex-wrap items-center justify-start gap-2'>
          {todo.tags.map((tag) => (
            <span
              key={tag}
              className='bg-pastel-teal-light text-pastel-teal-dark border-pastel-teal-light rounded-full border px-2 py-1 text-xs'
            >
              <i className='bi bi-tag-fill mr-1'></i> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className='flex w-full flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-stretch justify-start gap-2'>
          <select
            value={todo.status}
            name='status'
            onChange={handleToggleStatus}
            className={'rounded-full border-2 p-1 text-sm font-medium ' + getStatusColor(todo.status)}
          >
            {statuses.map((status: Status) => (
              <option value={status} key={status} className='bg-pastel-white text-pastel-gray-dark'>
                {status}
              </option>
            ))}
          </select>

          <button
            onClick={handleEdit}
            className='text-pastel-white warning-btn cursor-pointer rounded-full px-3 py-1 text-sm font-medium'
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='text-pastel-white danger-btn cursor-pointer rounded-full px-3 py-1 text-sm font-medium'
          >
            Delete
          </button>
        </div>

        <div
          className={
            'text-sm font-semibold ' + (isOverdue(todo.dueDate as Date) ? 'text-red-400' : 'text-pastel-teal-dark')
          }
        >
          Due: {formatTime(todo.dueDate)}
        </div>
      </div>
    </article>
  )
}
