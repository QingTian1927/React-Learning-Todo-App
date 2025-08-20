export default function ViewSwitcher() {
  return (
    <nav className='bg-invert text-invert flex cursor-pointer rounded-lg font-bold'>
      <ul className='rounded-s-md px-5 py-2 hover:bg-orange-400'>Day</ul>
      <ul className='px-5 py-2 hover:bg-orange-400'>Week</ul>
      <ul className='px-5 py-2 hover:bg-orange-400'>Month</ul>
      <ul className='rounded-e-md px-5 py-2 hover:bg-orange-400'>All</ul>
    </nav>
  )
}
