// src/components/Footer.tsx

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f8f8', padding: '3rem 1rem', fontSize: '0.9rem', color: '#333' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Grid de secciones */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
          
          {/* Empresa */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Empresa</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Sobre Nosotros</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Servicios</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Desarrollo Web</li>
              <li>Automatización</li>
              <li>Consultoría</li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Recursos</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Documentación</li>
              <li>FAQs</li>
              <li>Blog Técnico</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>WhatsApp</li>
              <li>Email</li>
              <li>Ubicación</li>
            </ul>
          </div>

        </div>

        {/* Separador */}
        <hr style={{ margin: '2rem 0', borderColor: '#ddd' }} />

        {/* Copyright */}
        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#777' }}>
          © 2025 GASCHSOFT. Todos los derechos reservados. | Hecho en Guatemala
        </div>

      </div>
    </footer>
  );
};

export default Footer;
