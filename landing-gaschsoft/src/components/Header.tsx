function Header() {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '2px 11px',
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
        {/* Logo en imagen */}
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" alt="GaschSoft Logo" style={{ height: '40px' }} />
        </a>

        {/* Menú de navegación */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <a href="#services" style={{
            color: '#333',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem'
          }}>Servicios</a>

          <a href="#contact" style={{
            color: '#333',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1rem'
          }}>Contacto</a>

          <a href="https://wa.me/50251232754" target="_blank" rel="noopener noreferrer" style={{
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '0.31rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            Escríbenos
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
