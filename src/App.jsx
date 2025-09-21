import React from 'react'
import './index.css'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import HODForm from './components/HODForm'

export default function App() {
  return (
    <div className='bg-gradient-to-br from-white via-blue-50 to-purple-50  min-h-screen'>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/HOD-login' element={<HODForm/>}/>
        <Route path='/' element={<h1 className='text-3xl font-bold underline'>Hello JNTU-GV!</h1>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
