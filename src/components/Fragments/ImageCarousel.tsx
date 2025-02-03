import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    customPaging: () => (
      <div className='w-2.5 h-2.5 bg-gray-300 rounded-full mx-2 cursor-pointer hover:bg-primary transition-all duration-300'></div>
    ),
    dotsClass: 'slick-dots custom-dots',
  };

  return (
    <div className='flex flex-col justify-center items-center h-full bg-[#F3F9FB]'>
      <Slider {...settings} className='w-full max-w-xl'>
        <div className='w-full h-96'>
          <img
            src='/imageCarousel/image1.svg'
            alt='Image1'
            className='w-full h-full'
          />
        </div>
        <div className='w-full h-96'>
          <img
            src='/imageCarousel/image2.svg'
            alt='Image2'
            className='w-full h-full'
          />
        </div>
        <div className='w-full h-96'>
          <img
            src='/imageCarousel/image3.svg'
            alt='Image3'
            className='w-full h-full'
          />
        </div>
      </Slider>
      <div className='text-center mt-8 hidden md:block'>
        <h2 className='text-3xl font-bold text-primary-dark'>Kosku, Rumahku</h2>
        <p className='text-black py-4 px-20'>
          Menciptakan Platform Pengelolaan Kos yang Memudahkan dan Meningkatkan
          Kepercayaan!
        </p>
      </div>
    </div>
  );
};

export default ImageCarousel;
