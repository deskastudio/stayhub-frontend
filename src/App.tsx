import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Fragments/Sidebar';
import AdminDashboard from './Pages/AdminDashboard';
import DataUser from './Pages/AdminDataUser';
import DataPembayaran from './Pages/AdminDataPembayaran';
import DataFasilitas from './Pages/AdminDataFasilitas';
import DataKamar from './Pages/AdminDataKamar';
import DataAjuan from './Pages/AdminDataAjuan';
import TypeKamar from './Pages/AdminTypeKamar';

// User Pages
import UserBeranda from './Pages/UserBeranda';
import UserAjuan from './Pages/UserAjuan';
import UserListAjuan from './Pages/UserListAjuan';
import UserProfil from './Pages/UserProfil';
import UserPembayaran from './Pages/UserPembayaran';
import UserTestimoni from './Pages/UserTestimoni';

// Landing Page
import LandingPage from './Pages/LandingPage';
import RoomSilver from './Pages/RoomSilver';
import RoomGold from './Pages/RoomGold';
import RoomPlatinum from './Pages/RoomPlatinum';
// import ScrollToTop from "./components/ScrollToTop"; // Tambahkan jika dibutuhkan
import BookingPage from './Pages/BookingPage';
import LoginPage from './Pages/LoginPageUser';
import RegisterPage from './Pages/RegisterPage';

const AppContent: React.FC = () => {
  const location = useLocation();

  // Routes that require Sidebar
  const routesWithSidebar = [
    '/beranda',
    '/data-user',
    '/data-pembayaran',
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

  // Check if the current location matches any route that should show Sidebar
  const showSidebar = routesWithSidebar.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex bg-primary-bgprimary">
      {showSidebar && <Sidebar />}
      <div className="flex-1 p-4">
        {/* <ScrollToTop /> Uncomment this if you want to scroll to top on route change */}
        <Routes>
          {/* Login and Register Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route path="/beranda" element={<AdminDashboard />} />
          <Route path="/data-user" element={<DataUser />} />
          <Route path="/data-pembayaran" element={<DataPembayaran />} />
          <Route path="/data-fasilitas" element={<DataFasilitas />} />
          <Route path="/data-kamar" element={<DataKamar />} />
          <Route path="/type-kamar/*" element={<TypeKamar />} />
          <Route path="/data-ajuan" element={<DataAjuan />} />

          {/* User Routes */}
          <Route path="/user-dashboard" element={<UserBeranda />} />
          <Route path="/user-profile" element={<UserProfil />} />
          <Route path="/user-payment" element={<UserPembayaran />} />
          <Route path="/user-testimoni" element={<UserTestimoni />} />
          <Route path="/user-ajuan" element={<UserAjuan />} />
          <Route path="/user-list-ajuan" element={<UserListAjuan />} />

          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/silver" element={<RoomSilver />} />
          <Route path="/gold" element={<RoomGold />} />
          <Route path="/platinum" element={<RoomPlatinum />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
