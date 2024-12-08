import { useState } from 'react';
import axios from '../services/root.service';
import { useNavigate } from 'react-router-dom';

const MascotaForm = () => {
  const [mascota, setMascota] = useState({
    nombre: '',
    fecha_nacimiento: '',
    edad: '',
    sexo: '',
    raza: '',
    peso: '',
    chip: false,
    esterilizado: false,
    enfermedades: '',
    otitis: false,
    pulgas: false,
    heridas: false,
    personalidad: '',
    recordatorio: '',
    nodos: 0,
    nota: 0,
    imagenAntes: null,
    imagenDespues: null,
    notasAdicionales: '', // Notas adicionales
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setMascota((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(mascota).forEach((key) => {
      if (key === 'imagenAntes' || key === 'imagenDespues') {
        if (mascota[key]) formData.append(key, mascota[key]); // Archivos
      } else if (Array.isArray(mascota[key])) {
        formData.append(key, JSON.stringify(mascota[key])); // Arrays como JSON string
      } else {
        formData.append(key, mascota[key]);
      }
    });

    try {
      const response = await axios.post('/mascota', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage({ type: 'success', text: 'Mascota registrada exitosamente.' });
      console.log('Mascota registrada:', response.data);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al registrar la mascota. Por favor, intenta de nuevo.',
      });
      console.error('Error al registrar la mascota:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Mascota</h2>
      {message.text && (
        <div
          className={`p-4 mb-4 text-sm text-white rounded-lg ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          value={mascota.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Fecha de nacimiento */}
        <input
          type="date"
          name="fecha_nacimiento"
          value={mascota.fecha_nacimiento}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Edad */}
        <input
          type="number"
          name="edad"
          value={mascota.edad}
          onChange={handleChange}
          placeholder="Edad"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Sexo */}
        <select
          name="sexo"
          value={mascota.sexo}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Seleccione Sexo</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
        {/* Raza */}
        <input
          type="text"
          name="raza"
          value={mascota.raza}
          onChange={handleChange}
          placeholder="Raza"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Peso */}
        <input
          type="number"
          name="peso"
          value={mascota.peso}
          onChange={handleChange}
          placeholder="Peso (kg)"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Chip */}
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="chip"
              checked={mascota.chip}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span>Tiene Chip</span>
          </label>
        </div>
        {/* Esterilizado */}
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="esterilizado"
              checked={mascota.esterilizado}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span>Esterilizado</span>
          </label>
        </div>
        {/* Enfermedades */}
        <textarea
          name="enfermedades"
          value={mascota.enfermedades}
          onChange={handleChange}
          placeholder="Enfermedades"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        {/* Personalidad */}
        <textarea
          name="personalidad"
          value={mascota.personalidad}
          onChange={handleChange}
          placeholder="Personalidad"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        {/* Recordatorio */}
        <textarea
          name="recordatorio"
          value={mascota.recordatorio}
          onChange={handleChange}
          placeholder="Recordatorio"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        {/* Nodos */}
        <input
          type="number"
          name="nodos"
          value={mascota.nodos}
          onChange={handleChange}
          placeholder="Nodos"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Nota */}
        <input
          type="number"
          name="nota"
          value={mascota.nota}
          onChange={handleChange}
          placeholder="Nota (1-10)"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Notas Adicionales */}
        <textarea
        name="notasAdicionales"
        value={mascota.notasAdicionales}
        onChange={handleChange}
        placeholder="Notas adicionales"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Imagen Antes */}
        <input
          type="file"
          name="imagenAntes"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Imagen Después */}
        <input
          type="file"
          name="imagenDespues"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Registrar
          </button>
          <button
            type="button"
            onClick={() => navigate('/mascotas-menu')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default MascotaForm;