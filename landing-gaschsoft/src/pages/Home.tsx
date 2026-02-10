import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import ContactFormSection from '../components/ContactFormSection';
import ResultsSection from '../components/ResultsSection';
import ProcessSection from '../components/ProcessSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ResultsSection />
      <ServicesSection />
      <ProcessSection />
      <GallerySection />
      <ContactFormSection />
      <Footer />
    </>
  );
}

export default Home;
