import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HODLogin from './Pages/HODLogin';
import IQACLogin from './Pages/IQACLogin';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from "./Pages/Profile";
import IqacDashboard from './Pages/IQACDashboard';
import AddDetails from './Pages/AddDetails';
import HodDashboard from './Pages/HODDashBoard'
import Admin from './Pages/Admin';
import AdminLogin from './Pages/AdminLogin';
import ViewCertificaion from './Pages/ViewCertificaion';
import EditPage from './Pages/EditPage';
import EditAdmin from "./Pages/EditAdmin"
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import AddCredentials from './Pages/AddCredentials';
import ResetHODPassword from './Pages/ResetHODPassword';
import ForgotHODPassword from "./Pages/ForgotHODpassword"
import ChangeIQACPassword from './Pages/ChangeIQACPassword';
import Forgotiqac from './Pages/Forgotiqac';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <BrowserRouter>
        <Header />
        <main className='grow'>
          <Routes>
            <Route path='/hod' element={<HODLogin />} />
            <Route path='/ofc' element={<IQACLogin />} />
            <Route path='/edit' element={<EditPage />} />
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/profile/:profileId' element={<Profile />} />
            <Route path='/ofcDashboard' element={<IqacDashboard />} />

            <Route path='/profile/' element={<Profile />} />
            <Route path='/iqacDashboard' element={<IqacDashboard />} />

            <Route path='/add' element={<AddDetails />} />
            <Route path='/hodDashboard/:userId' element={<HodDashboard />} />
            <Route path='/adminPage' element={<Admin />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/vc' element={<ViewCertificaion />} />
            <Route path='/ea' element={<EditAdmin />} />
            <Route path='/fp/' element={<ForgotPassword />} />
            <Route path='/ac/' element={<AddCredentials />} />
            <Route path='/rp' element={<ResetPassword />} />
            <Route path='/resetHODpassword' element={<ResetHODPassword />} />
            <Route path='/forgotHODpassword' element={<ForgotHODPassword />} />
            <Route path='/pc/' element={<ForgotPassword />} />
            <Route path='/ofcChange' element={<ChangeIQACPassword />} />
            <Route path='/forgotpass' element={<Forgotiqac/>} />
          </Routes>
        </main>
        <footer className='flex justify-center p-6'>
          <p className="mt-8 text-xs text-gray-500">
            © Faculty Information System
          </p>
        </footer>
      </BrowserRouter>
    </div>
  );
}
