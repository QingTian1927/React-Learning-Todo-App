import { type Status, statuses, type Todo } from '../../types/Todo'

type TodoItemProps = {
  todo: Todo
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-UK').format(date)
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <article className='bg-pastel-white flex flex-col items-start justify-start gap-5 rounded-lg p-5'>
      <header className='flex w-full justify-between'>
        <h3 className='text-2xl font-semibold'>{todo.title}</h3>

        <div className='bg-pastel-pink text-pastel-white flex min-w-[5em] items-center justify-center rounded-full px-2 text-sm'>
          <span>{todo.priority}</span>
        </div>
      </header>

      <div>
        <p className='mb-5'>{todo.description}</p>

        <div className='flex flex-wrap items-center justify-start gap-2'>
          {todo.tags.map((tag) => (
            <span className='bg-pastel-teal-light text-pastel-teal-dark border-pastel-teal-light rounded-full border px-2 py-1 text-xs'>
              <i className='bi bi-tag-fill mr-1'></i> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className='flex w-full flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-stretch justify-start gap-2'>
          <select className='bg-pastel-turquoise text-pastel-white rounded-full p-1 text-sm font-medium'>
            {statuses.map((status: Status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>

          <button className='text-pastel-white warning-btn cursor-pointer rounded-full px-3 py-1 text-sm font-medium'>
            Edit
          </button>
          <button className='text-pastel-white danger-btn cursor-pointer rounded-full px-3 py-1 text-sm font-medium'>
            Delete
          </button>
        </div>

        <div className='text-pastel-teal-dark text-sm font-semibold'>Due: {formatTime(todo.dueDate)}</div>
      </div>
    </article>
  )
}
