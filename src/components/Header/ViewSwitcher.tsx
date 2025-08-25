export default function ViewSwitcher() {
  return (
    <nav className='bg-pastel-turquoise text-pastel-white flex cursor-pointer rounded-full font-bold'>
      <ul className='hover:bg-pastel-white hover:text-pastel-turquoise rounded-s-full px-5 py-2'>Day</ul>
      <ul className='hover:bg-pastel-white hover:text-pastel-turquoise px-5 py-2'>Week</ul>
      <ul className='hover:bg-pastel-white hover:text-pastel-turquoise px-5 py-2'>Month</ul>
      <ul className='hover:bg-pastel-white hover:text-pastel-turquoise rounded-e-full px-5 py-2'>All</ul>
    </nav>
  )
}
