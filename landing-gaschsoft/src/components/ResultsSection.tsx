export default function ResultsSection() {
  const items = [
    { title: 'Más clientes', desc: 'Landing enfocada en conversión con CTA claro y velocidad.' },
    { title: 'Menos trabajo manual', desc: 'Automatizaciones que ahorran horas cada semana.' },
    { title: 'Control y orden', desc: 'Sistemas CRUD internos para operar sin caos.' },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-semibold tracking-tight">Resultados que se sienten</h2>
      <p className="mt-3 text-gray-600 max-w-2xl">
        Gaschsoft construye soluciones que mejoran ventas, operaciones y control.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{it.title}</h3>
            <p className="mt-2 text-gray-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
