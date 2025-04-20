import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import GallerySection from '../components/GallerySection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <GallerySection /> {/* Aquí está perfecto ya */}
      <ServicesSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
