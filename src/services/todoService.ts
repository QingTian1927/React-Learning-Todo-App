import type { Priority, Status, Todo } from '../types/Todo'
import { cacheService } from './cacheService'

const BASE_URL = 'https://shrimo.com/fake-api/todos'

export interface ApiResponse<T> {
  message: string
  data: T
}

type TodoResponse = {
  _id: string
  title: string
  description: string
  dueDate: string // ISO date string
  priority: Priority
  status: Status
  tags: string[]
}

async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`)
  }

  const rawData: TodoResponse[] = await response.json()
  const todos: Todo[] = rawData.map((item) => ({
    ...item,
    id: item._id,
    dueDate: new Date(item.dueDate)
  }))

  cacheService.save(todos)
  return todos
}

async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`)
  }

  const result: ApiResponse<TodoResponse> = await response.json()
  const newTodo = { ...result.data, dueDate: new Date(result.data.dueDate), id: result.data._id }
  return newTodo
}

async function deleteTodo(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error(`Failed to delete todo: ${response.statusText}`)
  }
}

async function updateTodo(id: string, todo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })

  if (!response.ok) {
    throw new Error(`Failed to update: todo: ${response.statusText}`)
  }
  const result: ApiResponse<TodoResponse> = await response.json()
  const updatedTodo = { ...result.data, dueDate: new Date(result.data.dueDate), id: result.data._id }
  return updatedTodo
}

export const todoService = {
  get: getTodos,
  create: createTodo,
  delete: deleteTodo,
  update: updateTodo
} as const
