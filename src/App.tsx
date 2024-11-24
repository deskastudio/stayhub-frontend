import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import LandingPage from "./pages/LandingPage";
import RoomSilver from "./pages/RoomSilver";
import RoomGold from "./pages/RoomGold";
import RoomPlatinum from "./pages/RoomPlatinum";
import ScrollToTop from "./components/ScrollToTop";
import BookingPage from "./pages/BookingPage";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div className="flex bg-primary-bgprimary">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
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
              <Route path="/user-settings" element={<UserPembayaran />} />
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
      </Router>
    </UserProvider>
  );
};

export default App;
