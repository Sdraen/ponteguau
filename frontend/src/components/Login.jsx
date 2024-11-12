import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { handleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comuna, setComuna] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar el error antes de cada intento

    try {
      if (isLogin) {
        // Lógica para inicio de sesión
        if (email === 'admin@email.com' && password === 'admin123') {
          await handleLogin(email, password); // Inicio de sesión de administrador
          navigate('/admin'); // Redirigir al menú principal de administrador
        } else {
          // Aquí puedes agregar lógica adicional para usuarios no administradores
          await handleLogin(email, password); // Inicio de sesión de usuario
          navigate('/'); // Redirigir a la página de inicio
        }
      } else {
        // Lógica para registro de usuario
        console.log('Registro con:', { name, rut, phone, email, address, comuna, password });
        setIsLogin(true); // Cambiar a modo login después del registro
      }
    } catch {
      setError('Error al iniciar sesión. Por favor, revisa tus credenciales.');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir a la página de inicio al cancelar
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                <input
                  type="text"
                  id="rut"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  required={!isLogin}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={!isLogin}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required={!isLogin}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label htmlFor="comuna" className="block text-sm font-medium text-gray-700">Comuna</label>
                <input
                  type="text"
                  id="comuna"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  required={!isLogin}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
          {isLogin && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full mt-2 px-4 py-2 font-bold text-blue-500 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
          )}
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p className="mt-3 text-center text-gray-600">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline ml-1"
          >
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;