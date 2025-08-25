import type { ReactNode } from 'react'

type AppContainerProps = {
  children?: ReactNode
}

export default function AppContainer({ children }: AppContainerProps) {
  return <div className='bg-pastel-cream text-pastel-gray-dark w-sw min-h-svh p-5'>{children}</div>
}
