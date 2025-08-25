type HeaderTitleProps = {
  time: string
}

export default function HeaderTitle({ time }: HeaderTitleProps) {
  return (
    <div className='text-pastel-gray-dark flex h-full items-center gap-3'>
      <h1 className='text-2xl font-bold'>Tasks</h1>
      <span className='text-2xl'>{time}</span>
    </div>
  )
}
