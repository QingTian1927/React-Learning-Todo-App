function getCurrentTime(): string {
  const now = new Date()
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now)
}

export default function Header() {
  return (
    <header className='flex min-h-[10svh] w-full items-center justify-between gap-2 rounded-md p-5'>
      <div className='flex h-full items-center gap-3'>
        <h1 className='text-2xl font-bold'>Tasks</h1>
        <span className='text-2xl'>{getCurrentTime()}</span>
      </div>

      <input className='h-full min-w-[45%] rounded-md bg-stone-200 p-2' type='search' placeholder='Search todos' />

      <nav className='flex cursor-pointer rounded-lg bg-blue-500 font-bold text-stone-50'>
        <ul className='rounded-s-md px-5 py-2 hover:bg-blue-700'>Day</ul>
        <ul className='px-5 py-2 hover:bg-blue-700'>Week</ul>
        <ul className='px-5 py-2 hover:bg-blue-700'>Month</ul>
        <ul className='rounded-e-md px-5 py-2 hover:bg-blue-700'>All</ul>
      </nav>
    </header>
  )
}
