import FilterBar from './FilterBar'
import HeaderTitle from './HeaderTitle'
import ViewSwitcher from './ViewSwitcher'

function getCurrentTime(): string {
  const now = new Date()
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now)
}

export default function Header() {
  return (
    <header className='flex min-h-[10svh] w-full items-center justify-between gap-2 rounded-md'>
      <HeaderTitle time={getCurrentTime()} />
      <FilterBar />
      <ViewSwitcher />
    </header>
  )
}
