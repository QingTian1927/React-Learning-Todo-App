export const priorities = ['Low', 'Medium', 'High', 'Critical'] as const
export type Priority = (typeof priorities)[number]

export const priorityOrder: Record<Priority, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4
}

export type Todo = {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: Priority
  status: Status
  tags: string[]
}

export const statuses = ['Not Started', 'In Progress', 'Completed'] as const
export type Status = (typeof statuses)[number]

export function createEmptyTodo(): Todo {
  return {
    id: '',
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'Low',
    status: 'Not Started',
    tags: ['']
  }
}
