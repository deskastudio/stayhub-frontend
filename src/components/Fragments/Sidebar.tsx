import React from 'react';
import { useUser } from '../../hooks/useUser';
import SidebarItem from '../Elements/SidebarItem';

// Icon paths for admin and user
const adminSidebarItems = [
    { label: 'Beranda', href: '/beranda', iconSrc: '/icon/beranda-icon.svg' },
    { label: 'Data User', href: '/data-user', iconSrc: '/icon/user-icon.svg' },
    { label: 'Data Pembayaran', href: '/data-pembayaran', iconSrc: '/icon/pembayaran-icon.svg' },
    { label: 'Data Fasilitas', href: '/data-fasilitas', iconSrc: '/icon/fasilitas-icon.svg' },
    { label: 'Data Kamar', href: '/data-kamar', iconSrc: '/icon/data-kamar-icon.svg' },
    { label: 'Tipe Kamar', href: '/type-kamar', iconSrc: '/icon/tipe-kamar-icon.svg' },
    { label: 'Data Ajuan', href: '/data-ajuan', iconSrc: '/icon/ajuan-keluhan-icon.svg' },
];

const userSidebarItems = [
    { label: 'Beranda', href: '/user-dashboard', iconSrc: '/icon/beranda-icon.svg' },
    { label: 'Ajuan', href: '/user-ajuan', iconSrc: '/icon/ajuan-keluhan-icon.svg' },
    { label: 'List Ajuan', href: '/user-list-ajuan', iconSrc: '/icon/list-ajuan-icon.svg' },
    { label: 'Testimoni', href: '/user-testimoni', iconSrc: '/icon/testimoni-icon.svg' },
    { label: 'Pembayaran', href: '/user-settings', iconSrc: '/icon/pembayaran-icon.svg' },
    { label: 'Profil', href: '/user-profile', iconSrc: '/icon/user-icon.svg' },
];

// Separate "Keluar" button item
const logoutItem = { label: 'Keluar', href: '/keluar', iconSrc: '/icon/keluar-icon.svg' };

const Sidebar: React.FC = () => {
    const { userType } = useUser(); // Ambil status user dari context

    const sidebarItems = userType === 'admin' ? adminSidebarItems : userSidebarItems; // Pilih items sesuai tipe user

    return (
        <div className="bg-white h-screen p-4 rounded-r-2xl shadow-md w-64 flex flex-col items-center">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
                <img src="/stayhubLogin.png" alt="StayHub Logo" className="w-2/3" /> {/* Gambar logo */}
            </div>
            <div className="w-full border-b border-gray-300 mb-4"></div>
            {/* Sidebar Items */}
            <div className="flex flex-col w-full space-y-2 flex-grow">
                {sidebarItems.map((item) => (
                    <SidebarItem 
                        key={item.label} 
                        label={item.label} 
                        href={item.href} 
                        iconSrc={item.iconSrc} 
                    />
                ))}
            </div>
            {/* Logout Button at the Bottom */}
            <div className="mt-auto w-full">
                <SidebarItem 
                    label={logoutItem.label} 
                    href={logoutItem.href} 
                    iconSrc={logoutItem.iconSrc} 
                />
            </div>
        </div>
    );
};

export default Sidebar;
