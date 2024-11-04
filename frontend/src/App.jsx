// src/App.jsx
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/Approutes';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
