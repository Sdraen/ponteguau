const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Hero Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            ¡Haz que tu mascota luzca y se sienta increíble!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            En Ponteguau, nos dedicamos al cuidado y belleza de tu mascota.
            ¡Reserva tu cita hoy mismo!
          </p>
          <a
            href="#services"
            className="mt-6 inline-block bg-blue-500 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-600"
          >
            Reserva una cita
          </a>
        </div>
      </section>

      {/* Pet Photos */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Algunos de nuestros clientes felices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pet 1 */}
            <div className="text-center">
              <img
                src="/images/nanuk.png"
                alt="Nanuk"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Nanuk
              </h3>
            </div>

            {/* Pet 2 */}
            <div className="text-center">
              <img
                src="/images/chloe.png"
                alt="Chloe"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Chloe
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
