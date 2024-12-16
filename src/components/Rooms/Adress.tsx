const Adress: React.FC = () => {
  return (
    <div className='py-16'>
      <h2 className='text-4xl font-bold text-primary mb-8'>Alamat</h2>
      <div className='w-full h-96 overflow-hidden rounded-lg shadow-lg'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.373359571887!2d107.62684181089712!3d-6.845766766942568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e72ccf63b7e3%3A0xb10742d5c0baa271!2sJl.%20Dago%20Giri%20No.102%2C%20Mekarwangi%2C%20Kec.%20Lembang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040391!5e0!3m2!1sid!2sid!4v1733755693559!5m2!1sid!2sid'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen={true}
          loading='lazy'
          title='Google Maps Location'
        ></iframe>
      </div>
    </div>
  );
};

export default Adress;
