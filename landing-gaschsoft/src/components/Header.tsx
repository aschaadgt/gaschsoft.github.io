
function Header() {

  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ color: '#0a0a23', fontWeight: 700, fontSize: '1.5rem' }}>
          GASCHSOFT
        </h1>

        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#services" style={{ color: '#333', textDecoration: 'none', fontWeight: 500 }}>Servicios</a>
          <a href="#contact" style={{ color: '#333', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
          <a href="https://wa.me/50251232754" target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600
          }}>
            Escríbenos
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
