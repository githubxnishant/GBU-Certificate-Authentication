import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
// import Home from './Pages/Home.jsx'
// import Validation from './Pages/Validation.jsx'
import Error from './Pages/Error.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home /> */}
    {/* <Validation /> */}
    <Error />
  </StrictMode>
)