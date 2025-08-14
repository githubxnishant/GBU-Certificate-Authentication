import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './index.css'
import Records from './pages/Records'
// import Settings from './pages/Settings'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Dashboard />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/records' element={<Records />} />
        {/* <Route path='/settings' element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
