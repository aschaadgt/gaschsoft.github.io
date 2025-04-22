function ServicesSection() {
  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos sitios rápidos, modernos y adaptables para cualquier dispositivo. Especialistas en landing pages para captación de clientes.',
      image: '/Service5.webp',
    },
    {
      title: 'Automatización de Procesos',
      description: 'Automatizamos tareas repetitivas en Microsoft Office, Power Automate y entornos Windows para mejorar la productividad.',
      image: '/Service4.webp',
    },
    {
      title: 'Sistemas de Inventario y Ventas',
      description: 'Creamos sistemas en la nube o locales para gestionar inventarios, ventas, control de stocks y acceso multiusuario.',
      image: '/Service2.webp',
    },
    {
      title: 'Creación de Correos Corporativos',
      description: 'Configuramos correos profesionales en Zoho Mail, Microsoft 365, Google Workspace y más.',
      image: '/Service1.webp',
    },
    {
      title: 'Consultoría Tecnológica',
      description: 'Te asesoramos para digitalizar procesos y potenciar tu negocio con soluciones inteligentes y modernas.',
      image: '/Service3.webp',
    },
    {
      title: 'Sistemas CRM',
      description: 'Implementamos sistemas CRM para gestionar relaciones con clientes, ventas y seguimiento de oportunidades.',
      image: '/Service6.webp',
    },
    {
      title: 'Instalación de Redes y Domótica',
      description: 'Diseñamos redes domésticas y sistemas de domótica integrados con Alexa, Google Assistant y Siri mediante Wi-Fi, Thread y Zigbee.',
      image: '/Service7.webp',
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
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            width: '250px', // Fijo para que sean iguales
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <img src={service.image} alt={service.title} style={{
              width: '64px',
              height: '64px',
              marginBottom: '1rem',
              objectFit: 'contain',
              marginLeft: 'auto',
              marginRight: 'auto',
            }} />
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
