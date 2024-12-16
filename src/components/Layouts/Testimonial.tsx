import TestimonialCard from '../Fragments/TestimonialCard';

const testimonials = [
  {
    text: 'Tinggal di kost ini sangat nyaman. Kamar bersih, Wi-Fi cepat, dan fasilitas lengkap. Pemilik kost ramah dan lokasinya strategis. Pengingat pembayaran otomatis sangat membantu. Highly recommended!',
    name: 'Sekar Ayu L',
    type: 'Type Platinum - 202',
    rating: 4,
    image: 'https://picsum.photos/102/101',
    alt: 'Profile picture of Sekar Ayu L',
  },
  {
    text: 'Kamarnya bersih dan AC berfungsi baik. Lingkungan kost tenang dan cocok untuk belajar. Semua tagihan sudah termasuk sewa, jadi sangat praktis. Recommended!',
    name: 'Kevin Adi',
    type: 'Type Silver - 105',
    rating: 4,
    image: 'https://picsum.photos/102/102',
    alt: 'Profile picture of Kevin Adi',
  },
  {
    text: 'Lokasi strategis, fasilitas memadai, dan pemilik ramah. Fitur pengingat pembayaran sangat membantu.',
    name: 'Angelia Putri',
    type: 'Type Gold - 302',
    rating: 4,
    image: 'https://picsum.photos/102/103',
    alt: 'Profile picture of Angelia Putri',
  },
];

const Testimonial = () => {
  return (
    <>
      <div className='container'>
        <h1 className='text-5xl font-bold font-main mx-auto text-center text-primary mb-12 max-w-[530px]'>
          Kata Mereka Tentang Stayhub
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        <div className='flex justify-center mt-8'>
          <div className='w-7 h-7 bg-primary rounded-full mx-1'></div>
          <div className='w-7 h-7 border border-primary rounded-full mx-1'></div>
          <div className='w-7 h-7 border border-primary rounded-full mx-1'></div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
