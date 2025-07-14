import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import CampLocation from './pages/CampLoaction'

function AppContent() {
  const location = useLocation()
  const showNavbar = location.pathname !== '/login'

  return (
    <div className="flex">
      {showNavbar && <Navbar />}
      <div className={`flex-1 ${showNavbar ? 'ml-0 lg:ml-0' : ''}`}>
        <Routes>
          <Route 
            path="/login" 
            element={<Login />}
          />
          <Route path='/' element={<Dashboard />} />
          <Route path='/camplocation' element={<CampLocation />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App