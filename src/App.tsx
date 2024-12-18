import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Fragments/Sidebar';

// Landing Page
import LandingPage from './Pages/LandingPages';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProtectedRoute from './components/Elements/ProtectRouted';
import Room from './Pages/Room';

// Admin Pages
import AdminDashboard from './Pages/AdminDashboard';
import DataUser from './Pages/AdminDataUser';
import DataFasilitas from './Pages/AdminDataFasilitas';
import DataKamar from './Pages/AdminDataKamar';
import DataAjuan from './Pages/AdminDataAjuan';
import TypeKamar from './Pages/AdminTypeKamar';

// User Pages
import UserBeranda from './Pages/UserBeranda';
import UserAjuan from './Pages/UserAjuan';
import UserListAjuan from './Pages/UserListAjuan';
import UserProfil from './Pages/UserProfil';
// import UserPembayaran from './Pages/UserPembayaran';
import UserTestimoni from './Pages/UserTestimoni';

const AppContent: React.FC = () => {
  const location = useLocation();

  const routesWithSidebar = [
    '/admin-dashboard',
    '/data-user',
    // '/data-pembayaran',
    '/data-fasilitas',
    '/data-kamar',
    '/type-kamar',
    '/data-ajuan',
    '/user-dashboard',
    '/user-profile',
    '/user-payment',
    '/user-testimoni',
    '/user-ajuan',
    '/user-list-ajuan',
  ];

  const showSidebar = routesWithSidebar.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className='flex bg-primary-bgprimary'>
      {showSidebar && <Sidebar />}
      <div className='flex-1 p-4'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/room/type/:id' element={<Room />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute role='admin'>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/data-user'
            element={
              <ProtectedRoute role='admin'>
                <DataUser />
              </ProtectedRoute>
            }
          />
          <Route
            path='/data-fasilitas'
            element={
              <ProtectedRoute role='admin'>
                <DataFasilitas />
              </ProtectedRoute>
            }
          />
          <Route
            path='/data-kamar'
            element={
              <ProtectedRoute role='admin'>
                <DataKamar />
              </ProtectedRoute>
            }
          />
          <Route
            path='/type-kamar/*'
            element={
              <ProtectedRoute role='admin'>
                <TypeKamar />
              </ProtectedRoute>
            }
          />
          <Route
            path='/data-ajuan'
            element={
              <ProtectedRoute role='admin'>
                <DataAjuan />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-dashboard'
            element={
              <ProtectedRoute role='user'>
                <UserBeranda />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-profile'
            element={
              <ProtectedRoute role='user'>
                <UserProfil />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path='/user-payment'
            element={
              <ProtectedRoute role='user'>
                <UserPembayaran />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path='/user-testimoni'
            element={
              <ProtectedRoute role='user'>
                <UserTestimoni />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-ajuan'
            element={
              <ProtectedRoute role='user'>
                <UserAjuan />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user-list-ajuan'
            element={
              <ProtectedRoute role='user'>
                <UserListAjuan />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
