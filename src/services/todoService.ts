import { createOfflineAction } from '../types/OfflineAction'
import type { Priority, Status, Todo } from '../types/Todo'
import { cacheService } from './cacheService'
import { offlineService } from './offlineService'

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

async function getTodos(isOnline = navigator.onLine): Promise<Todo[]> {
  console.log({ isOnline })

  if (isOnline) {
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

  const cached = cacheService.load()
  if (Array.isArray(cached)) {
    return cached.map((todo) => ({
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
    }))
  }
  return []
}

async function createTodo(todo: Omit<Todo, 'id'>, isOnline = navigator.onLine): Promise<Todo> {
  if (isOnline) {
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

  const offlineAction = createOfflineAction({ ...todo, id: '' }, 'create')
  offlineService.enqueue(offlineAction)

  const cached: Todo[] = (cacheService.load() as Todo[]) ?? []
  const newLocalTodo = { ...todo, id: offlineAction.id }
  cacheService.save([newLocalTodo, ...cached])

  return newLocalTodo
}

async function deleteTodo(id: string, isOnline = navigator.onLine) {
  if (isOnline) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.statusText}`)
    }
  }

  const offlineAction = createOfflineAction({ id } as Todo, 'delete')
  offlineService.enqueue(offlineAction)

  const cached: Todo[] = (cacheService.load() as Todo[]) ?? []
  const updatedCache = cached.filter((todo) => todo.id !== id)
  cacheService.save(updatedCache)

  return
}

async function updateTodo(id: string, todo: Partial<Omit<Todo, 'id'>>, isOnline = navigator.onLine): Promise<Todo> {
  if (isOnline) {
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

  const offlineAction = createOfflineAction({ ...todo, id } as Todo, 'update')
  offlineService.enqueue(offlineAction)

  const cached: Todo[] = (cacheService.load() as Todo[]) ?? []
  const updatedCache = cached.map((oldTodo) => (oldTodo.id === id ? { ...oldTodo, ...todo } : oldTodo))
  cacheService.save(updatedCache)

  const updatedTodo = updatedCache.find((t) => t.id === id)
  if (!updateTodo) {
    throw new Error(`Todo with id {id} was not found in cache`)
  }

  return updatedTodo as Todo
}

export const todoService = {
  get: getTodos,
  create: createTodo,
  delete: deleteTodo,
  update: updateTodo
} as const
