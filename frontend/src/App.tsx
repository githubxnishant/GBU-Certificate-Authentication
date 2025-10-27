import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './globals.css'
import Records from './pages/Records'
// import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './context/ProtectedRoute'
import Homepage from './pages/Homepage'
import Logs from './pages/Logs'
import CertificateDetails from './pages/CertificateDetails'
import Admins from './pages/Admins'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Homepage />} />
          <Route path='/' element={<Homepage />} />
          <Route path="/certificate/:certificateId" element={<CertificateDetails />} />
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/records' element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          } />
          <Route path='/logs' element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          } />
          <Route path='/admins' element={
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
