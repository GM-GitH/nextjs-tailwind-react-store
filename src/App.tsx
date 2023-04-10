import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { ContextProvider } from './context/ProductsContext'
import { Home, Provider } from './pages'

function App() {
  return (
    <ContextProvider>
      <Router basename="/nextjs-tailwind-react-store">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Provider />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ContextProvider>
  )
}

export default App
