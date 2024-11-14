const ServicesSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Peluquerías */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src="/images/peluquerias.jpg"
              alt="Peluquerías"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-center mt-4">
              Peluquería
            </h3>
            <p className="mt-2 text-center text-gray-600">
              Servicios de corte de pelo, baño, corte de uñas y limpieza de
              oídos según el tamaño de tu mascota.
            </p>
            <div className="text-center mt-4">
              <a
                href="#appointment"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Agendar Cita
              </a>
            </div>
          </div>
          {/* Baños */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src="/images/baños.jpg"
              alt="Baños"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-center mt-4">Baños</h3>
            <p className="mt-2 text-center text-gray-600">
              Baños con tratamiento de hidratación, corte de uñas y limpieza de
              oídos.
            </p>
            <div className="text-center mt-4">
              <a
                href="#appointment"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Agendar Cita
              </a>
            </div>
          </div>
          {/* Retoques */}
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src="/images/retoques.jpg"
              alt="Retoques"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-center mt-4">Retoques</h3>
            <p className="mt-2 text-center text-gray-600">
              Servicios de retoque de pelo, tratamiento de hidratación y más.
            </p>
            <div className="text-center mt-4">
              <a
                href="#appointment"
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Agendar Cita
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
