function HeroSection() {
    return (
      <section style={{
        backgroundColor: '#f8f9fa',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#0a0a23',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}>
          Transformamos tu empresa con innovación digital
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#555',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}>
          Soluciones tecnológicas inteligentes para negocios modernos en Guatemala.
        </p>
        <a href="https://wa.me/50251232754" target="_blank" rel="noopener noreferrer" style={{
          backgroundColor: '#0071e3',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          ¡Hablemos en WhatsApp!
        </a>
      </section>
    );
  }
  
  export default HeroSection;
  