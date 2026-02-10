function ContactSection() {
    return (
      <section id="contact" style={{
        backgroundColor: '#f2f2f2',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#0a0a23',
        }}>
          ¿Listo para impulsar tu negocio?
        </h2>
  
        <p style={{
          color: '#555',
          fontSize: '1rem',
          marginBottom: '2rem',
        }}>
          Estamos listos para ayudarte a dar el siguiente paso.
        </p>
  
        <a href="https://wa.me/50251174129" target="_blank" rel="noopener noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'background-color 0.3s',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#128C7E'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
        >
          ¡Contáctanos por WhatsApp!
        </a>
      </section>
    );
  }
  
  export default ContactSection;
  