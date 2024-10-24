import About from "./components/Layouts/About"
import Hero from "./components/Layouts/Hero"
import Navbar from "./components/Layouts/Navbar"
import Facilities from "./components/Layouts/Facilities"
import FAQList from "./components/Layouts/FAQList"
import Room from "./components/Layouts/Room"
import Testimonial from "./components/Layouts/Testimonial"
import Footer from "./components/Layouts/Footer"

const App:React.FC = () => {

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Facilities/>
      <FAQList />
      <Room/>
      <Testimonial/>
      <Footer/>
    </>
  )
}

export default App
