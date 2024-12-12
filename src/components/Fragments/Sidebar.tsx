
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/auth.utils';
import SidebarItem from '../Elements/SidebarItem';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { role } = getUserRole();

  // Tentukan item sidebar berdasarkan userType
  const sidebarItems =
    role === 'admin'
      ? [
          {
            label: 'Beranda',
            href: '/beranda',
            iconSrc: '/icon/beranda-icon.svg',
          },
          {
            label: 'Data User',
            href: '/data-user',
            iconSrc: '/icon/user-icon.svg',
          },
          {
            label: 'Data Pembayaran',
            href: '/data-pembayaran',
            iconSrc: '/icon/pembayaran-icon.svg',
          },
          {
            label: 'Data Fasilitas',
            href: '/data-fasilitas',
            iconSrc: '/icon/fasilitas-icon.svg',
          },
          {
            label: 'Data Kamar',
            href: '/data-kamar',
            iconSrc: '/icon/data-kamar-icon.svg',
          },
          {
            label: 'Tipe Kamar',
            href: '/type-kamar',
            iconSrc: '/icon/tipe-kamar-icon.svg',
          },
          {
            label: 'Data Ajuan',
            href: '/data-ajuan',
            iconSrc: '/icon/ajuan-keluhan-icon.svg',
          },
        ]
      : [
          {
            label: 'Beranda',
            href: '/user-dashboard',
            iconSrc: '/icon/beranda-icon.svg',
          },
          {
            label: 'Profil',
            href: '/user-profile',
            iconSrc: '/icon/user2-icon.svg',
          },
          {
            label: 'Pembayaran',
            href: '/user-payment',
            iconSrc: '/icon/pembayaran-icon.svg',
          },
          {
            label: 'Testimoni',
            href: '/user-testimoni',
            iconSrc: '/icon/testimoni-icon.svg',
          },
          {
            label: 'Ajuan',
            href: '/user-ajuan',
            iconSrc: '/icon/ajuan-keluhan-icon.svg',
          },
          {
            label: 'List Ajuan',
            href: '/user-list-ajuan',
            iconSrc: '/icon/listAjuan-icon.svg',
          },
        ];

  const sidebarClass =
    role === 'admin' ? 'bg-admin-sidebar' : 'bg-user-sidebar';

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');

    axios.post(
      'http://localhost:8000/auth/logout',
      {},
      { withCredentials: true }
    );

    navigate('/login');
  };

  return (
    <div
      className={`bg-white h-screen p-4 rounded-r-2xl shadow-md w-64 flex flex-col items-center ${sidebarClass}`}
    >
      <div className='flex flex-col items-center mb-6'>
        <img src='/stayhubLogin.png' alt='StayHub Logo' className='w-2/3' />
      </div>
      <div className='w-full border-b border-gray-300 mb-4'></div>
      <div className='flex flex-col w-full space-y-2 flex-grow'>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>
      <div className='mt-auto w-full'>
        <button
          onClick={handleLogout}
          className='w-full text-left flex items-center space-x-2 p-2 text-red-500 hover:bg-gray-200 rounded-lg'
        >
          <img src='/icon/keluar-icon.svg' alt='Keluar' className='w-5 h-5' />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
