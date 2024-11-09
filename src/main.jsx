import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


let allRoutes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    }
  ]
) 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes}/>
  </StrictMode>
)