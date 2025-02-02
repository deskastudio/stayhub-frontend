import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
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
    link: '#tentang-kami',
  },
  {
    id: 3,
    title: 'Tipe Kamar',
    link: '#tipe-kamar',
  },
  {
    id: 4,
    title: 'Kontak',
    link: '#kontak',
  },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='shadow-md rounded-b-xl sticky top-0 w-full z-10 bg-default'>
      <div className='container flex justify-between items-center py-4'>
        <a href='/'>
          <img src='/stayhub-logo2.png' alt='StayHub Logo' />
        </a>

        {/* Menu toggle for small screens */}
        <div className='lg:hidden'>
          <button
            onClick={toggleMenu}
            aria-label='Toggle menu'
            className='text-gray-600 text-2xl focus:outline-none'
          >
            {isMenuOpen ? (
              <FaTimes size='30' color='#113F67' />
            ) : (
              <FaBars size='30' color='#113F67' />
            )}
          </button>
        </div>

        {/* Navbar menu */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block absolute lg:static top-full left-0 w-full rounded-xl lg:w-auto bg-default lg:bg-transparent shadow-md lg:shadow-none`}
        >
          <ul className='flex flex-col lg:flex-row items-center gap-6 p-4 lg:p-0'>
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  onClick={closeMenu} // Close menu on click
                  className='block font-main text-gray-400 text-base xl:text-base py-2 lg:py-1 px-2 xl:px-3 hover:text-primary transition-all duration-300 font-medium'
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className='flex flex-col items-center gap-4 mt-4 pb-6 lg:hidden'>
            <Button
              custom='border border-primary py-3 text-primary'
              to='/login'
              onClick={closeMenu}
            >
              Masuk
            </Button>
            <Button
              custom='bg-primary py-3 text-white'
              to='/register'
              onClick={closeMenu}
            >
              Daftar
            </Button>
          </div>
        </nav>

        {/* Buttons for large screens */}
        <div className='hidden lg:flex gap-2'>
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
