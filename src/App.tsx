import { useEffect, useState } from 'react'
import AppContainer from './components/AppContainer/AppContainer'
import Header from './components/Header/Header'
import TodoInput from './components/TodoInput/TodoInput'
import TodoList from './components/TodoList/TodoList'
import { createEmptyTodo, type Todo } from './types/Todo'
import { todoService } from './services/todoService'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { offlineService } from './services/offlineService'
import toast, { Toaster } from 'react-hot-toast'
import Footer from './components/Footer/Footer'
import { availableViewModes, type ViewMode } from './types/ViewMode'

function App() {
  const isOnline = useOnlineStatus()

  const [originalTodos, setOriginalTodos] = useState<Todo[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [showInputForm, setShowInputForm] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>(availableViewModes[0])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    function fetchTodos() {
      return new Promise((resolve, reject) => {
        const doFetch = async () => {
          try {
            let fetchedTodos = await todoService.get(isOnline)

            if (isOnline && offlineService.isUnsynced()) {
              await offlineService.sync()
              fetchedTodos = await todoService.get(isOnline)
            }

            fetchedTodos = todoService.sort(fetchedTodos, 'date-asc')
            setTodos(fetchedTodos)
            setOriginalTodos(fetchedTodos)

            resolve(true)
          } catch (err) {
            reject(err)
          }
        }
        doFetch()
      })
    }

    toast.promise(
      fetchTodos(),
      {
        loading: 'Loading todos...',
        success: 'Todos loaded successfully!',
        error: 'Failed to load todos'
      },
      {
        id: 'fetch-todos'
      }
    )
  }, [isOnline])

  function handleSelectTodo(todo?: Todo) {
    setCurrentTodo(todo ?? createEmptyTodo())
  }

  async function handleSave(todo: Todo): Promise<boolean> {
    if (!todo) {
      toast.error('Please enter all required task details')
      return false
    }

    let result
    try {
      const promise = (async () => {
        const { id, ...todoData } = todo

        if (todo.id !== '') {
          const updatedTodo = await todoService.update(id, todoData, isOnline)
          setTodos((prev) => prev.map((oldTodo) => (oldTodo.id === id ? { ...updatedTodo, id } : oldTodo)))
          setTodos((prev) => todoService.sort(prev, 'date-asc'))
          return true
        }

        const newTodo = await todoService.create(todoData, isOnline)
        setTodos((prev) => [newTodo, ...prev])
        setTodos((prev) => todoService.sort(prev, 'date-asc'))
        return true
      })()

      await toast.promise(promise, {
        loading: 'Saving todo...',
        success: 'Todo saved successfully!',
        error: 'Failed to save todo'
      })

      result = await promise
    } catch (err) {
      console.error('Failed to save todo:', err)
      result = false
    }

    return result
  }

  async function handleDeleteTodo(id: string): Promise<boolean> {
    if (id === '') {
      toast.error('No task was selected for deletion')
      return false
    }

    let result
    try {
      const promise = todoService.delete(id, isOnline)

      await toast.promise(promise, {
        loading: 'Deleting todo...',
        success: 'Todo deleted successfully!',
        error: 'Failed to delete todo'
      })

      if (currentTodo && currentTodo.id === id) {
        setCurrentTodo(null)
      }
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      setTodos((prev) => todoService.sort(prev, 'date-asc'))

      result = true
    } catch (err) {
      console.error('Failed to delete todo:', err)
      result = false
    }

    return result
  }

  return (
    <>
      <Toaster
        toastOptions={{
          className: 'text-pastel-gray-dark bg-pastel-white border-2 border-pastel-turquoise',
          success: {
            iconTheme: {
              primary: '#8accd5',
              secondary: '#ffffff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ff90bb',
              secondary: '#ffffff'
            }
          }
        }}
      />

      <AppContainer>
        <Header
          todos={originalTodos}
          setTodos={setTodos}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAll={showAll}
          setShowAll={setShowAll}
        />

        <main>
          <TodoList
            viewMode={viewMode}
            showAll={showAll}
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

        <Footer todoCount={todos.length} />
      </AppContainer>
    </>
  )
}

export default App
