import { generateUniqueId } from '../utils/randomUtils'
import type { Todo } from './Todo'

export type OfflineActionType = 'create' | 'update' | 'delete'

export type OfflineAction = {
  id: string
  data: Todo
  type: OfflineActionType
  timestamp: Date
}

export function createOfflineAction(data: Todo, type: OfflineActionType): OfflineAction {
  const now = new Date()

  return {
    id: generateUniqueId(now),
    data: data,
    type: type,
    timestamp: now
  }
}
