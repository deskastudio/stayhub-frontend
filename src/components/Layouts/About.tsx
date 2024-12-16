const About: React.FC = () => {
  return (
    <>
      <div
        id='about'
        className='container flex pb-40 md:py-[100px] gap-10 justify-between flex-wrap-reverse md:flex-nowrap md:items-center'
      >
        <div>
          <img src='img-about.png' alt='' />
        </div>
        <div className='flex flex-col gap-8 md:w-[600px] lg:w-[700px]'>
          <h1 className='text-4xl font-bold font-main leading-normal'>
            Tentang <span className='text-secondary'>Stayhub</span>
          </h1>
          <div className='flex'>
            <div className='w-2 bg-primary rounded-md p'></div>
            <div className='flex flex-col gap-4 pl-4'>
              <p className='font-normal text-lg text-gray-500 max-w-[530px]'>
                StayHub menyediakan berbagai pilihan kamar kos yang dikelola
                langsung oleh pemilik. Dengan lokasi strategis dan fasilitas
                lengkap, Anda dapat menemukan kamar yang sesuai dengan kebutuhan
                Anda.
              </p>
              <p className='font-normal text-lg text-gray-500 max-w-[530px]'>
                Proses pemesanan dan pembayaran di StayHub sangat mudah dan
                transparan, memberikan pengalaman sewa yang praktis dan nyaman.
                Temukan kamar ideal Anda di StayHub dan nikmati kenyamanan
                seperti di rumah!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
