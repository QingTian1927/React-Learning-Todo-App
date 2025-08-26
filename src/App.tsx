import { useEffect, useState } from 'react'
import AppContainer from './components/AppContainer/AppContainer'
import Header from './components/Header/Header'
import TodoInput from './components/TodoInput/TodoInput'
import TodoList from './components/TodoList/TodoList'
import { createEmptyTodo, type Todo } from './types/Todo'
import { todoService } from './services/todoService'
import { useOnlineStatus } from './hooks/useOnlineStatus'

function App() {
  const isOnline = useOnlineStatus()
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [showInputForm, setShowInputForm] = useState(false)

  useEffect(() => {
    async function fetchTodos() {
      try {
        const fetchedTodos = await todoService.get(isOnline)
        setTodos(fetchedTodos)
      } catch (err) {
        console.error('Failed to fetch todos:', err)
      }
    }
    fetchTodos()
  }, [isOnline])

  function handleSelectTodo(todo?: Todo) {
    setCurrentTodo(todo ?? createEmptyTodo())
  }

  async function handleSave(todo: Todo): Promise<boolean> {
    if (!todo) {
      alert('Please enter all required task details')
      return false
    }

    if (todo.id !== '') {
      try {
        const { id, ...todoData } = todo
        const updatedTodo = await todoService.update(id, todoData, isOnline)
        setTodos((prev) => prev.map((oldTodo) => (oldTodo.id === id ? { ...updatedTodo, id } : oldTodo)))

        return true
      } catch (err) {
        console.error('Failed to update todo:', err)
        alert('Error updating todo')
        return false
      }
    }

    try {
      const { id, ...todoData } = todo
      const newTodo = await todoService.create(todoData, isOnline)
      setTodos((prev) => [newTodo, ...prev])

      return true
    } catch (err) {
      console.error('Failed to create todo:', err)
      alert('Error creating todo')
    }

    return false
  }

  async function handleDeleteTodo(id: string): Promise<boolean> {
    if (id === '') {
      alert('No task was selected for deletion')
      return false
    }

    try {
      await todoService.delete(id, isOnline)

      if (currentTodo && currentTodo.id === id) {
        setCurrentTodo(null)
      }
      setTodos((prev) => prev.filter((todo) => todo.id !== id))

      alert('Todo deleted successfully')
      return true
    } catch (err) {
      console.error('Failed to delete todo:', err)
      alert('Error deleting todo')
    }

    return false
  }

  return (
    <AppContainer>
      <Header />

      <main>
        <TodoList
          todos={todos}
          onEdit={handleSelectTodo}
          onDelete={handleDeleteTodo}
          onToggleStatus={handleSave}
          setShowInputForm={setShowInputForm}
        />
        {showInputForm && (
          <TodoInput
            todo={currentTodo}
            setShowInputForm={setShowInputForm}
            setTodo={setCurrentTodo}
            onSubmit={handleSave}
          />
        )}
      </main>
    </AppContainer>
  )
}

export default App
