import './App.css'
import { Upload } from './components/Upload'
import { Home } from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </Router>
  )
}

export default App