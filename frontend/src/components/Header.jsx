import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); // Para identificar la ruta actual

  return (
    <header className="bg-primary text-white py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            {/* Imagen del logo */}
            <img
              src="/images/logo.png"
              alt="Ponteguau Logo"
              className="logo-img"
              style={{ height: '180px', width: 'auto' }} // Ajusta el tamaño del logo aquí
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/services"
                  className={`nav-link ${
                    location.pathname === '/services' ? 'active' : ''
                  }`}
                >
                  Servicios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/calendar"
                  className={`nav-link ${
                    location.pathname === '/calendar' ? 'active' : ''
                  }`}
                >
                  Calendario
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/appointment"
                  className={`nav-link ${
                    location.pathname === '/appointment' ? 'active' : ''
                  }`}
                >
                  Agendar Cita
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin"
                  className={`nav-link ${
                    location.pathname === '/admin' ? 'active' : ''
                  }`}
                >
                  Administración
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/schedule"
                  className={`nav-link ${
                    location.pathname === '/schedule' ? 'active' : ''
                  }`}
                >
                  Gestión de Horarios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pets"
                  className={`nav-link ${
                    location.pathname === '/pets' ? 'active' : ''
                  }`}
                >
                  Gestión de Mascotas
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link ${
                    location.pathname === '/login' ? 'active' : ''
                  }`}
                >
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
