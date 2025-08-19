export default function Header() {
  return (
    <header className='flex w-full items-center justify-between gap-2 rounded-md p-5'>
      <div className='flex items-center gap-5'>
        <h1 className='text-2xl font-bold'>My Todo List</h1>
        <span>(10 due today)</span>
      </div>

      <nav className='flex gap-5'>
        <ul className='rounded-md bg-blue-500 px-5 py-2 font-bold text-stone-50'>Day</ul>
        <ul className='rounded-md bg-blue-500 px-5 py-2 font-bold text-stone-50'>Week</ul>
        <ul className='rounded-md bg-blue-500 px-5 py-2 font-bold text-stone-50'>Month</ul>
        <ul className='rounded-md bg-blue-500 px-5 py-2 font-bold text-stone-50'>All</ul>
      </nav>

      <input type='search' placeholder='Search todos'></input>
    </header>
  )
}
