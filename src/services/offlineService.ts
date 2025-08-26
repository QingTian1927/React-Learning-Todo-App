import type { OfflineAction } from '../types/OfflineAction'
import type { Todo } from '../types/Todo'
import { cacheService } from './cacheService'
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

function enqueueAction(newAction: OfflineAction) {
  if (newAction.type === 'delete') {
    const createIndex = queue.findIndex((action) => action.data.id === newAction.data.id && action.type === 'create')

    // Don't sync locally created todo items if they are immediately deleted afterwards
    if (createIndex !== -1) {
      queue.splice(createIndex, 1)
      saveQueue(queue)
      return
    }
  }

  if (newAction.type === 'update') {
    const createAction = queue.find((action) => action.data.id === newAction.data.id && action.type === 'create')

    // Append edited data directly to the create request of a locally created todo item
    if (createAction) {
      createAction.data = { ...createAction.data, ...newAction.data }
      saveQueue(queue)
      return
    }
  }

  queue.push(newAction)
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

function isDataUnsynced(): boolean {
  return queue.length > 0
}

async function processQueue(): Promise<boolean> {
  while (queue.length > 0) {
    const action = queue[0]

    try {
      const { id, ...todoData } = action.data

      switch (action.type) {
        case 'create': {
          const createdTodo = await todoService.create(action.data)
          const oldId = id || action.data.id
          const newId = createdTodo.id

          updateQueueItemIds(oldId, newId)
          updateCacheItemId(oldId, newId)
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
      return false
    }
  }

  return isDataUnsynced()
}

function updateQueueItemIds(oldId: string, newId: string) {
  queue = queue.map((action) => {
    if (action.data.id === oldId) {
      return { ...action, data: { ...action.data, id: newId } }
    }
    return action
  })
  saveQueue(queue)
}

function updateCacheItemId(oldId: string, newId: string) {
  const cachedTodo = (cacheService.load() as Todo[]) ?? []
  const updatedTodos = cachedTodo.map((todo) => (todo.id === oldId ? { ...todo, id: newId } : todo))
  cacheService.save(updatedTodos)
}

export const offlineService = {
  enqueue: enqueueAction,
  dequeue: dequeueAction,
  sync: processQueue,
  getQueue: getQueue,
  isUnsynced: isDataUnsynced
} as const
