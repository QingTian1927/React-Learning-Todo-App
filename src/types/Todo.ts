export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'

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
  status: 'Not Started' | 'In Progress' | 'Completed'
  tags: string[]
}

export const statuses = ['Not Started', 'In Progress', 'Completed'] as const
export type Status = (typeof statuses)[number]
