import { useState } from 'react'

export default function Counter() {
  const [state, setState] = useState({
    count: 0,
    user: 'Hallo'
  })

  return (
    <>
      <div className='text-2xl font-bold'>
        Counter: {state.count} {state.user}
      </div>

      <button
        className='mr-5 border p-2'
        onClick={() => {
          setState((state) => ({
            ...state,
            count: state.count - 1
          }))
        }}
      >
        Decrease
      </button>

      <button
        className='mr-5 border p-2'
        onClick={() => {
          setState((state) => ({
            ...state,
            count: state.count + 1
          }))
        }}
      >
        Increase
      </button>

      <button
        className='border p-2'
        onClick={() => {
          setState((state) => ({
            ...state,
            user: 'Spell'
          }))
        }}
      >
        Change User
      </button>
    </>
  )
}
