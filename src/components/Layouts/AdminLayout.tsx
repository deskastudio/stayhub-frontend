import React from 'react';
import Sidebar from '../Fragments/Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64 p-4">
            {children}
        </div>
    </div>
);

export default AdminLayout;
