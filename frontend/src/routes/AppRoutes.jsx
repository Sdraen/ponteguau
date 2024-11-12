import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Calendar from '../components/Calendar';
import Login from '../components/Login';
import LoginRoutes from './LoginRoutes';
import PetManagement from '../components/PetManagement'; // Importa el componente PetManagement

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
            
            {/* Rutas protegidas */}
            <Route element={<LoginRoutes />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/pets" element={<PetManagement />} /> {/* Ruta para PetManagement */}
            </Route>
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default AppRoutes;