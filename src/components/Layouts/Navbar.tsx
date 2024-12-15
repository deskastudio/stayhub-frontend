import React from 'react';
import Button from '../Elements/ButtonLanding';

const NavbarMenu = [
  {
    id: 1,
    title: 'Beranda',
    link: '/',
  },
  {
    id: 2,
    title: 'Tentang Kami',
    link: '#about',
  },
  {
    id: 3,
    title: 'Booking',
    link: '#booking',
  },
  {
    id: 4,
    title: 'Kontak',
    link: '#contact',
  },
];

const Navbar: React.FC = () => {
  return (
    <div className='shadow-md rounded-b-xl sticky top-0 w-full z-10 bg-default'>
      <div className='container flex justify-between items-center py-4'>
        <img src='/stayhub-logo2.png' alt='' />
        <div className='hidden lg:block'>
          <ul className='flex items-center gap-6'>
            {NavbarMenu.map((item) => {
              return (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className='inline-block font-main text-gray-400 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-medium'
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex gap-2'>
          <Button custom='border border-primary py-3 text-primary' to='/login'>
            Masuk
          </Button>
          <Button custom='bg-primary py-3 text-white' to='/register'>
            Daftar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
