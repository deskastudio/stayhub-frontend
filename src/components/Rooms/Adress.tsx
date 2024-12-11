import React from 'react';

const Adress: React.FC = () => {
  return (
    <div className='py-16'>
      <h2 className='text-4xl font-bold text-primary mb-8'>Alamat</h2>
      <div className='w-full h-96 overflow-hidden rounded-lg shadow-lg'>
        <iframe
          src='https://www.google.com/maps/embed?...'
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
