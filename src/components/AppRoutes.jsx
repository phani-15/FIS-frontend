import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header'
import HODLogin from '../Pages/HODLogin';
import IQACLogin from '../Pages/IQACLogin';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Profile from "../Pages/Profile";
import IqacDashboard from '../Pages/IQACDashboard';
import HodDashboard from '../Pages/HODDashBoard'
import Admin from '../Pages/Admin';
import AdminLogin from '../Pages/AdminLogin';
import ViewCertificaion from '../Pages/ViewCertificaion';
import EditAdmin from "../Pages/EditAdmin"
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';
import AddCredentials from '../Pages/AddCredentials';
import ResetHODPassword from '../Pages/ResetHODPassword';
import ForgotHODPassword from "../Pages/ForgotHODpassword"
import ChangeIQACPassword from '../Pages/ChangeIQACPassword';
import Forgotiqac from '../Pages/Forgotiqac';
import AdminFP from '../Pages/AdminFP';
import PrivateRoutes from './PrivateRoutes';
import Home from '../Pages/Home';

export default function AppRoutes() {
    const location = useLocation()
    const showHeader = location.pathname !== '/';
    return (
        <>
            {showHeader &&
                <Header />}
            <main className='grow'>
                <Routes>
                    <Route path='/' element={<Home />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/fp/' element={<ForgotPassword />} />
                    <Route path='/register/:token' element={<Register />} />
                    <Route path='/rp' element={<ResetPassword />} />

                    <Route path='/profile/:profileId' element={<Profile />} />
                    <Route path='/ea/:profileId' element={<EditAdmin />} />
                    <Route path='/vc/:userId/:credId' element={<ViewCertificaion />} />
                    <Route path='/ac/:userId/:credId' element={<AddCredentials />} />

                    <Route path='/hod' element={<HODLogin />} />
                    <Route path='/hodDashboard/:userId' element={<HodDashboard />} />
                    <Route path='/resetHODpassword' element={<ResetHODPassword />} />
                    <Route path='/forgotHODpassword' element={<ForgotHODPassword />} />

                    <Route path='/ofc' element={<IQACLogin />} />
                    <Route path='/ofcDashboard/:ofcId' element={<IqacDashboard />} />
                    <Route path='/ofcChange' element={<ChangeIQACPassword />} />
                    <Route path='/forgotpass' element={<Forgotiqac />} />

                    <Route path='/adminPage/:adminId' element={<PrivateRoutes><Admin /></PrivateRoutes>} />
                    <Route path='/admin' element={<AdminLogin />} />
                    <Route path='/adminfp/' element={<AdminFP />} />

                </Routes>
            </main>
        </>
    );
}
