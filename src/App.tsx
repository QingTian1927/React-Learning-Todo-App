import AppContainer from './components/AppContainer/AppContainer'
import Header from './components/Header/Header'
import TodoList from './components/TodoList/TodoList'

function App() {
  return (
    <AppContainer>
      <Header />

      <main>
        <TodoList />
      </main>
    </AppContainer>
  )
}

export default App
