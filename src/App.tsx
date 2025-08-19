import './App.css'
import Counter from './components/Counter'
import Header from './components/Header/Header'
import Hello from './components/Hello'

function App() {
  return (
    <>
      <Header />

      <div className='bg-blue-500'>
        <Hello />

        <Counter />
      </div>
    </>
  )
}

export default App
