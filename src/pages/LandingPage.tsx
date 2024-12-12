import Navbar from '../components/Layouts/Navbar';
import Hero from '../components/Layouts/Hero';
import About from '../components/Layouts/About';
import Facilities from '../components/Layouts/Facilities';
import FAQList from '../components/Layouts/FAQList';
import TypeRoom from '../components/Layouts/RoomType';
import Testimonial from '../components/Layouts/Testimonial';
import Footer from '../components/Layouts/Footer';

const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <FAQList />
      <TypeRoom />
      <Testimonial />
      <Footer />
    </>
  );
};

export default LandingPage;
