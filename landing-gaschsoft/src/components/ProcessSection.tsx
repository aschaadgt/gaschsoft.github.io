export default function ProcessSection() {
  const steps = [
    { n: '01', title: 'Diagnóstico', desc: 'Entendemos tu necesidad y definimos alcance.' },
    { n: '02', title: 'Propuesta', desc: 'Plan por hitos, tiempos y costo claro.' },
    { n: '03', title: 'Ejecución', desc: 'Desarrollo con entregas y validación.' },
    { n: '04', title: 'Soporte', desc: 'Ajustes, mantenimiento y mejoras continuas.' },
  ];

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Proceso simple, entrega seria</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-semibold text-gray-500">{s.n}</div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
