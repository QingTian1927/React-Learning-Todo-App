const TODOS_CACHE_KEY = 'cachedTodos'

function saveTodosCache(todos: unknown) {
  try {
    const serialized = JSON.stringify(todos)
    localStorage.setItem(TODOS_CACHE_KEY, serialized)
  } catch (err) {
    throw new Error(`Error saving todos to cache: ${err}`)
  }
}

function loadTodosCache(): unknown | null {
  try {
    const serialized = localStorage.getItem(TODOS_CACHE_KEY)
    if (!serialized) {
      return null
    }

    return JSON.parse(serialized)
  } catch (err) {
    throw new Error(`Error loading todos from cache: ${err}`)
  }
}

function clearTodosCache() {
  try {
    localStorage.removeItem(TODOS_CACHE_KEY)
  } catch (err) {
    throw new Error(`Error clearing todos in cache: ${err}`)
  }
}

export const cacheService = {
  save: saveTodosCache,
  load: saveTodosCache,
  clear: clearTodosCache
} as const
