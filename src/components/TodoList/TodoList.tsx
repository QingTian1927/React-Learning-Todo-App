import { type Todo } from '../../types/Todo'
import TodoItem from '../TodoItem/TodoItem'

export default function TodoList() {
  const todos: Todo[] = [
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
  ]

  return (
    <section className='grid grid-cols-1 gap-5'>
      <TodoItem todo={todos[0]} />
      <TodoItem todo={todos[1]} />
      <TodoItem todo={todos[2]} />
    </section>
  )
}
