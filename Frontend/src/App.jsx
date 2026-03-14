import React from 'react'
import { Route, Router, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Register from './Pages/register'
import Login from './Pages/login'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
        <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App