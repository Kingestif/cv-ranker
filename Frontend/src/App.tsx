import './App.css'
import { Upload } from './components/Upload'
import { Home } from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Contact } from './components/Contact'
import ServicesPage from './components/Service'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/upload" element={<Upload/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
      </Routes>
    </Router>
  )
}

export default App