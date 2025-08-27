import { useOnlineStatus } from '../../hooks/useOnlineStatus'

type FooterProps = {
  todoCount: number
}

export default function Footer({ todoCount }: FooterProps) {
  const isOnline = useOnlineStatus()

  return (
    <footer className='bg-pastel-cream mt-5 flex w-full flex-wrap items-center justify-between gap-5'>
      <h3 className='font-medium'>Shrimo Todo</h3>

      <div className='flex items-center justify-end gap-2 font-medium'>
        <div className='border-pastel-teal-medium bg-pastel-teal-light text-pastel-teal-dark rounded-full border px-3 py-1'>
          <span className='mr-2'>Tasks:</span>
          <span>{todoCount}</span>
        </div>

        <div
          className={
            'flex items-center gap-2 rounded-full px-3 py-1 ' +
            (isOnline ? 'bg-pastel-turquoise text-pastel-white' : 'bg-pastel-pink text-pastel-white')
          }
        >
          <span>{isOnline ? 'Online' : 'Offline'}</span>
          <span>{isOnline ? <i className='bi bi-wifi'></i> : <i className='bi bi-wifi-off'></i>}</span>
        </div>
      </div>
    </footer>
  )
}
