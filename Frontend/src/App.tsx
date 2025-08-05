import './App.css'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <div className='bg-[url("/Wave6.svg")] h-screen bg-no-repeat bg-cover bg-right-bottom flex flex-col'>
      <NavBar/>
      <Hero/>
      <div className='mt-auto mb-8 mx-40 text-white font-bold'><Footer/></div>
    </div>
  )
}

export default App