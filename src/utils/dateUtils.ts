export function isOverdue(dueDate: Date): boolean {
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())

  return today > due
}

export function isToday(date: Date): boolean {
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateObj = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const result = today.getTime() === dateObj.getTime()
  return result
}

export function isPastDate(date: Date): boolean {
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateObj = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const result = today.getTime() > dateObj.getTime()
  return result
}
