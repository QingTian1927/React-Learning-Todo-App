import type { OfflineAction } from '../types/OfflineAction'
import { todoService } from './todoService'

const QUEUE_STORAGE_KEY = 'offlineActionStorage'

function loadQueue(): OfflineAction[] {
  try {
    const serialized = localStorage.getItem(QUEUE_STORAGE_KEY)
    return serialized
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSON.parse(serialized).map((action: any) => ({
          ...action,
          timestamp: new Date(action.timestamp)
        }))
      : []
  } catch (err) {
    console.error('Error loading offline action queue:', err)
    return []
  }
}

function saveQueue(queue: OfflineAction[]) {
  try {
    const serializableQueue = queue.map(({ ...action }) => ({
      ...action,
      timestamp: action.timestamp.toISOString()
    }))

    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(serializableQueue))
  } catch (err) {
    console.error('Error saving offline action queue:', err)
  }
}

let queue: OfflineAction[] = loadQueue()

function enqueueAction(action: OfflineAction) {
  queue.push(action)
  saveQueue(queue)
}

function dequeueAction(): OfflineAction | undefined {
  const action = queue.shift()
  saveQueue(queue)
  return action
}

function getQueue(): OfflineAction[] {
  return [...queue]
}

async function processQueue() {
  while (queue.length > 0) {
    const action = queue[0]

    try {
      const { id, ...todoData } = action.data

      switch (action.type) {
        case 'create': {
          await todoService.create(action.data)
          break
        }
        case 'update': {
          await todoService.update(id, todoData)
          break
        }
        case 'delete': {
          await todoService.delete(id)
          break
        }
      }

      dequeueAction()
    } catch (err) {
      console.error('Synchronization action failed:', err)
      break
    }
  }
}

export const offlineService = {
  enqueue: enqueueAction,
  dequeue: dequeueAction,
  sync: processQueue,
  getQueue: getQueue
} as const
