type TaskActionsProps = {
  todoId: string
}

export default function TaskActions({ todoId }: TaskActionsProps) {
  function handleTaskEdit() {
    alert(`Editing task ${todoId}`)
  }

  function handleTaskDelete() {
    alert(`Deleting task ${todoId}`)
  }

  return (
    <div className='flex gap-2'>
      <button className='rounded-md bg-blue-500 p-2' onClick={handleTaskEdit}>
        Edit
      </button>
      <button className='rounded-md bg-blue-500 p-2' onClick={handleTaskDelete}>
        Delete
      </button>
    </div>
  )
}
