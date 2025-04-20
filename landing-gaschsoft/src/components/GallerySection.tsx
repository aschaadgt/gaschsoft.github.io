function GallerySection() {
  return (
    <section className="bg-white py-16 flex justify-center">
      <div className="w-full px-4 flex flex-wrap gap-6 max-w-[1920px]">
        
        {/* Primer bloque */}
        <div className="flex flex-1 gap-6 min-w-[300px]">
          {/* Imagen Vertical */}
          <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
            <img src="/Vertical1.webp" alt="Imagen Vertical 1" className="w-full h-full object-cover" />
          </div>
          {/* Columnita de dos horizontales */}
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
              <img src="/Horizontal1.webp" alt="Imagen Horizontal 1" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
              <img src="/Horizontal2.webp" alt="Imagen Horizontal 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Segundo bloque */}
        <div className="flex flex-1 gap-6 min-w-[300px]">
          {/* Imagen Vertical */}
          <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
            <img src="/Vertical2.webp" alt="Imagen Vertical 2" className="w-full h-full object-cover" />
          </div>
          {/* Columnita de dos horizontales */}
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
              <img src="/Horizontal3.webp" alt="Imagen Horizontal 3" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden shadow-xl">
              <img src="/Horizontal4.webp" alt="Imagen Horizontal 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default GallerySection;
