function ServicesSection() {
    const services = [
      {
        title: 'Desarrollo Web',
        description: 'Creamos sitios rápidos, modernos y adaptables para cualquier dispositivo.',
      },
      {
        title: 'Automatización de Procesos',
        description: 'Integramos soluciones que mejoran la eficiencia y reducen costos operativos.',
      },
      {
        title: 'Consultoría Tecnológica',
        description: 'Te asesoramos para impulsar tu empresa con las mejores herramientas digitales.',
      },
    ];
  
    return (
      <section id="services" style={{
        backgroundColor: '#ffffff',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#0a0a23',
        }}>
          Nuestros Servicios
        </h2>
  
        <div style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '2rem',
              backgroundColor: '#f9f9f9',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{ fontSize: '1.5rem', color: '#0a0a23', marginBottom: '1rem' }}>
                {service.title}
              </h3>
              <p style={{ color: '#555', fontSize: '1rem' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default ServicesSection;
  