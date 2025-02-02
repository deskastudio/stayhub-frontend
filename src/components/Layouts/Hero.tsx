import Button from '../Elements/ButtonLanding';

const Hero: React.FC = () => {
  return (
    <>
      <div className='container flex py-24 justify-between items-center flex-wrap md:flex-nowrap'>
        <div className='flex flex-col gap-8 lg:max-w-[700px] md:w-4/6'>
          <h1 className='text-5xl lg:text-6xl font-bold text-primary font-main xl:leading-normal'>
            Temukan Kamar Kos Impian Anda Disini
          </h1>
          <p className='font-normal font-main text-md text-gray-500 max-w-[400px] lg:max-w-[530px]'>
            Kami menyediakan layanan lengkap untuk penyewaan kamar kos yang
            nyaman dan sesuai dengan kebutuhan Anda.
          </p>
          <div>
            <Button custom='bg-primary py-4 text-white'>
              <a href='#tipe-kamar'>Pilih Tipe Kamar</a>
            </Button>
          </div>
        </div>
        <div className=''>
          <img src='/img-kost.png' alt='' />
        </div>
      </div>
    </>
  );
};

export default Hero;
