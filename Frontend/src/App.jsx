import React from 'react'
import HomePage from './pages/HomePage'
import {Outlet} from '@tanstack/react-router'

const App = () => {
  return (
    <Outlet />
  )
}

export default App