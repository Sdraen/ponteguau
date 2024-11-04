// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import Calendar from '../components/Calendar';

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRoutes;
