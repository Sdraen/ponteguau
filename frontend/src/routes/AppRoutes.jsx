import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../../pages/HomePage';
import Login from '../components/Login';
import LoginRoutes from './LoginRoutes';
import PetManagement from '../components/PetManagement';
import ServicesSection from '../components/ServicesSection';
import AppointmentForm from '../components/AppointmentForm'; // Importa el componente AppointmentForm

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="w-full max-w-4xl">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<ServicesSection />} />
            {/* Rutas protegidas */}
            <Route element={<LoginRoutes />}>
              <Route path="/pets" element={<PetManagement />} />
              <Route path="/appointments" element={<AppointmentForm />} /> {/* Nueva ruta para AppointmentForm */}
            </Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default AppRoutes;