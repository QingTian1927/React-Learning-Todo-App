import type { ReactNode } from 'react'

type AppContainerProps = {
  children?: ReactNode
}

export default function AppContainer({ children }: AppContainerProps) {
  return <div className='bg text min-h-svh w-svw p-5'>{children}</div>
}
