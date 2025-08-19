import './App.css'
import Greeting from './components/Greeting'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'

function App() {
  return (
    <>
      <Header />

      <main>
        <Greeting name='Yuuki' />
        <Greeting name='Joe' />

        <TodoList />
      </main>
    </>
  )
}

export default App
