import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Fragments/Sidebar';
import Dashboard from './components/Pages/AdminDashboard';
import DataUser from './components/Pages/AdminDataUser';
import DataPembayaran from './components/Pages/AdminDataPembayaran';
import DataFasilitas from './components/Pages/AdminDataFasilitas';
import DataKamar from './components/Pages/AdminDataKamar';
import DataAjuan from './components/Pages/AdminDataAjuan';
import TypeKamar from './components/Pages/AdminTypeKamar';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <Routes>
                        <Route path="/beranda" element={<Dashboard />} />
                        <Route path="/data-user" element={<DataUser />} />
                        <Route path="/data-pembayaran" element={<DataPembayaran />} />
                        <Route path="/data-fasilitas" element={<DataFasilitas />} />
                        <Route path="/data-kamar" element={<DataKamar />} />
                        <Route path="/type-kamar/*" element={<TypeKamar />} />
                        <Route path="/data-ajuan" element={<DataAjuan />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
