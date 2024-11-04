import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Para identificar la ruta actual

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {/* Imagen del logo */}
            <img
              src="/images/logo.png"
              alt="Ponteguau Logo"
              className="h-24 w-auto" // Ajusta el tamaño del logo aquí
            />
          </Link>
          <button
            className="text-white block lg:hidden focus:outline-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/services"
              className={`${
                location.pathname === '/services' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Servicios
            </Link>
            <Link
              to="/calendar"
              className={`${
                location.pathname === '/calendar' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Calendario
            </Link>
            <Link
              to="/appointment"
              className={`${
                location.pathname === '/appointment' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Agendar Cita
            </Link>
            <Link
              to="/admin"
              className={`${
                location.pathname === '/admin' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Administración
            </Link>
            <Link
              to="/schedule"
              className={`${
                location.pathname === '/schedule' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Gestión de Horarios
            </Link>
            <Link
              to="/pets"
              className={`${
                location.pathname === '/pets' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Gestión de Mascotas
            </Link>
            <Link
              to="/login"
              className={`${
                location.pathname === '/login' ? 'text-yellow-400' : ''
              } hover:text-yellow-400`}
            >
              Iniciar Sesión
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
