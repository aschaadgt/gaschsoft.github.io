function HeroSection() {
  return (
    <section className="bg-[#ecebf1] flex flex-col justify-center items-center text-center min-h-[85vh] px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Transformamos tu empresa con innovación digital
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Soluciones tecnológicas inteligentes para negocios modernos en Guatemala.
        </p>
        <a
          href="https://wa.me/50251232754"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow transition"
        >
          ¡Hablemos en WhatsApp!
        </a>
      </div>

      <div className="mt-16 hidden md:block">
        <img
          src="/hero-office.jpg"
          alt="Oficina moderna"
          className="rounded-xl mx-auto max-w-4xl shadow-lg"
        />
      </div>
    </section>
  );
}

export default HeroSection;
