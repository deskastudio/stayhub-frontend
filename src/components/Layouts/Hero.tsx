import React from 'react';
import Button from '../Elements/ButtonLanding';

const Hero: React.FC = () => {
  return (
    <>
      <div className='container flex py-24 justify-between items-center'>
        <div className='flex flex-col gap-8 max-w-[700px]'>
          <h1 className='text-6xl font-bold text-primary font-main leading-normal'>
            Temukan Kamar Kos Impian Anda Disini
          </h1>
          <p className='font-normal font-main text-md text-gray-500 max-w-[530px]'>
            Kami menyediakan layanan lengkap untuk penyewaan kamar kos yang
            nyaman dan sesuai dengan kebutuhan Anda.
          </p>
          <div>
            <Button custom='bg-primary py-4 text-white'>Hubungi Kami</Button>
          </div>
        </div>
        <div>
          <img src='/img-kost.png' alt='' />
        </div>
      </div>
    </>
  );
};

export default Hero;
