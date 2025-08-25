import { useState } from 'react'
import AppContainer from './components/AppContainer/AppContainer'
import Header from './components/Header/Header'
import TodoInput from './components/TodoInput/TodoInput'
import TodoList from './components/TodoList/TodoList'
import { createEmptyTodo, type Todo } from './types/Todo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1a2b3c',
      title: 'Learn JavaScript',
      description: 'Complete JavaScript basics',
      dueDate: new Date('2024-11-15'),
      priority: 'High',
      status: 'Not Started',
      tags: ['JavaScript', 'Learning']
    },
    {
      id: '4d5e6f',
      title: 'Write Blog Post',
      description: 'Draft and publish a blog post about TypeScript',
      dueDate: new Date('2024-09-30'),
      priority: 'Medium',
      status: 'In Progress',
      tags: ['Writing', 'TypeScript', 'Blog']
    },
    {
      id: '7g8h9i',
      title: 'Plan Vacation',
      description: 'Research destinations and book flights',
      dueDate: new Date('2024-12-05'),
      priority: 'Low',
      status: 'Not Started',
      tags: ['Personal', 'Travel', 'Planning']
    }
  ])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  const [showInputForm, setShowInputForm] = useState(false)

  function handleSelectTodo(todo?: Todo) {
    setCurrentTodo(todo ?? createEmptyTodo)
  }

  function handleSave() {
    if (currentTodo && currentTodo.id !== '') {
      // edit mode
      return
    }

    if (!currentTodo) {
      alert('Please enter all required task details')
      return
    }

    currentTodo.id = '1' // placeholder code
    setTodos((prev) => [...prev, currentTodo])
  }

  return (
    <AppContainer>
      <Header />

      <main>
        <TodoList todos={todos} onEdit={handleSelectTodo} setShowInputForm={setShowInputForm} />
        {showInputForm && (
          <TodoInput setShowInputForm={setShowInputForm} setTodo={setCurrentTodo} onSubmit={handleSave} />
        )}
      </main>
    </AppContainer>
  )
}

export default App
