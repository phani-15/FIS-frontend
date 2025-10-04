import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HODLogin from './Pages/HODLogin';
import IQACLogin from './Pages/IQACLogin';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from "./Pages/Profile";
import User from './Pages/User';
import Iqac from './Pages/IQACDashboard'; 
import AddDetails from './Pages/AddDetails';
import Hod from './Pages/HODDashBoard'

export default function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/HOD-login' element={<HODLogin />} />
          <Route path='/IQAC-login' element={<IQACLogin />} /> 
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/iqac' element={<Iqac />} /> 
          <Route path='/add' element={<AddDetails/>} />
          <Route path='/hod' element={<Hod/>}/>
        </Routes>
        <footer className='flex justify-center p-6'>
          <p className="mt-8 text-xs text-gray-500">
          © Faculty Information System
        </p>
        </footer>
    </BrowserRouter>
  );
}
