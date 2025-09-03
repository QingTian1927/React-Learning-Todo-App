type HeaderTitleProps = {
  time: Date
}

function formatTime(now: Date): string {
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now)
}

export default function HeaderTitle({ time }: HeaderTitleProps) {
  return (
    <div className='text-pastel-gray-dark col-span-1 flex h-full items-center gap-3 xl:col-span-2'>
      <h1 className='text-2xl font-bold'>Tasks</h1>
      <span className='text-2xl'>{formatTime(time)}</span>
    </div>
  )
}
