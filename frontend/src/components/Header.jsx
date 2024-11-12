import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Ponteguau Logo"
              className="h-24 w-auto"
            />
          </Link>

          <button
            className="text-white block lg:hidden focus:outline-none"
            type="button"
            onClick={toggleMenu}
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

          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } lg:flex items-center space-x-6`}
          >
            <NavLink to="/services" currentPath={location.pathname}>Servicios</NavLink>
            <NavLink to="/calendar" currentPath={location.pathname}>Calendario</NavLink>
            <NavLink to="/appointment" currentPath={location.pathname}>Agendar Cita</NavLink>
            <NavLink to="/admin" currentPath={location.pathname}>Administración</NavLink>
            <NavLink to="/schedule" currentPath={location.pathname}>Gestión de Horarios</NavLink>
            <NavLink to="/pets" currentPath={location.pathname}>Gestión de Mascotas</NavLink>
            <NavLink to="/login" currentPath={location.pathname}>Iniciar Sesión</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, children, currentPath }) => (
  <Link
    to={to}
    className={`${
      currentPath === to ? 'text-yellow-400' : 'text-white'
    } hover:text-yellow-400`}
  >
    {children}
  </Link>
);
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default Header;