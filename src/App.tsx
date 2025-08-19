import './App.css'
import Greeting from './components/Greeting'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />

      <main>
        <Greeting name='Yuuki' />
        <Greeting name='Joe' />
      </main>
    </>
  )
}

export default App
