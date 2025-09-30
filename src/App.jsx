import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HODLogin from './Pages/HODLogin';
import IQACLogin from './Pages/IQACLogin'; // fixed double slash
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from "./Pages/Profile"
import User from './Pages/User';

export default function App() {
  return (
    <div className='min-h-screen'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/HOD-login' element={<HODLogin />} />
          <Route path='/IQAC-login' element={<IQACLogin />} /> 
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
