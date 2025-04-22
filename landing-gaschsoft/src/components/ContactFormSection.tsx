import { useState } from "react";

function ContactFormSection() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch('https://formspree.io/f/{tu_form_id}', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      form.reset();  // ✅ Limpia el formulario
      setMessageSent(true);  // ✅ Muestra pop-up

      setTimeout(() => {
        setMessageSent(false); // ✅ Oculta pop-up
      }, 3000);
    } catch (error) {
      console.error('Error al enviar:', error);
    }
  };

  return (
    <section id="contact" style={{
      backgroundColor: '#f9f9f9',
      padding: '4rem 2rem',
      textAlign: 'center',
      position: 'relative',
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#0a0a23',
      }}>
        ¿Tienes un proyecto en mente?
      </h2>
      <p style={{ marginBottom: '2rem', color: '#555' }}>
        Contáctanos y te responderemos en breve.
      </p>

      <form 
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <input type="text" name="name" placeholder="Tu nombre" required style={inputStyle} />
        <input type="email" name="email" placeholder="Tu correo electrónico" required style={inputStyle} />
        <textarea 
          name="message" 
          placeholder="Tu mensaje" 
          required 
          rows={5} 
          style={{ ...inputStyle, resize: 'none' }}
        ></textarea>
        <button type="submit" style={buttonStyle}>
          Enviar Mensaje
        </button>
      </form>

      {messageSent && (
        <div style={popupStyle}>
          ¡Mensaje enviado correctamente!
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
};

const buttonStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '1rem',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
};

const popupStyle = {
  position: 'absolute' as const,
  top: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 999,
};

export default ContactFormSection;
