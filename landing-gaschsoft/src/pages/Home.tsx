import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import GallerySection from '../components/GallerySection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ContactFormSection from '../components/ContactFormSection';

function Home() {
  return (
    <>
      <Header />
      <GallerySection /> 
      <HeroSection />
      <ServicesSection />
      <ContactFormSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
