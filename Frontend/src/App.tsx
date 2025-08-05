import './App.css'
import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <div className='bg-[url("/Wave5.svg")] h-screen bg-no-repeat bg-cover bg-bottom'>
      <NavBar/>
      <Hero/>
    </div>
  )
}

export default App