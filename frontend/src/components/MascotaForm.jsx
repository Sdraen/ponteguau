import { useState, useEffect } from 'react';
import { createMascota, updateMascota } from '../services/mascota.service';
import toast from 'react-hot-toast';

export default function MascotaForm({ mascota, onSuccess, propietarioId }) {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha_nacimiento: '',
    edad: '',
    sexo: '',
    raza: '',
    peso: '',
    enfermedades: '',
    chip: false,
    esterilizado: false,
    otitis: false,
    pulgas: false,
    heridas: false,
    personalidad: '',
    recordatorio: '',
    nota: '',
    nodos: '',
    imagenAntes: null,
    imagenDespues: null,
    notasAdicionales: [], // Agregamos este campo
  });

  const [notaAdicional, setNotaAdicional] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mascota) {
      setFormData({
        ...mascota,
        imagenAntes: null,
        imagenDespues: null,
      });
    }
  }, [mascota]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddNotaAdicional = () => {
    if (notaAdicional.trim()) {
      setFormData((prev) => ({
        ...prev,
        notasAdicionales: [...prev.notasAdicionales, notaAdicional.trim()],
      }));
      setNotaAdicional('');
    }
  };

  const handleRemoveNotaAdicional = (index) => {
    setFormData((prev) => ({
      ...prev,
      notasAdicionales: prev.notasAdicionales.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'fecha_nacimiento') {
          form.append(key, new Date(formData[key]).toISOString()); // Convertimos a ISO 8601
        } else if (key === 'notasAdicionales') {
          formData[key].forEach((nota) => form.append('notasAdicionales[]', nota));
        } else if (formData[key] !== null && formData[key] !== '') {
          form.append(key, formData[key]);
        }
      });

      form.append('propietario', propietarioId); // Agregamos el ID del propietario

      const response = mascota?._id
        ? await updateMascota(mascota._id, form)
        : await createMascota(form);

      toast.success(mascota?._id ? 'Mascota actualizada correctamente' : 'Mascota creada correctamente');
      onSuccess?.(response);
    } catch (error) {
      console.error(error);
      toast.error('Error al procesar la mascota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">{mascota ? 'Editar Mascota' : 'Registrar Nueva Mascota'}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} required />
        <InputField label="Edad" name="edad" type="number" value={formData.edad} onChange={handleChange} required />
        <SelectField label="Sexo" name="sexo" value={formData.sexo} onChange={handleChange} options={['Macho', 'Hembra']} required />
        <InputField label="Raza" name="raza" value={formData.raza} onChange={handleChange} required />
        <InputField label="Peso" name="peso" type="number" step="0.1" value={formData.peso} onChange={handleChange} required />
        <TextAreaField label="Enfermedades" name="enfermedades" value={formData.enfermedades} onChange={handleChange} rows="3" required />
        <CheckboxGroup
          label="Características"
          items={[
            { name: 'chip', label: 'Chip', checked: formData.chip },
            { name: 'esterilizado', label: 'Esterilizado', checked: formData.esterilizado },
            { name: 'otitis', label: 'Otitis', checked: formData.otitis },
            { name: 'pulgas', label: 'Pulgas', checked: formData.pulgas },
            { name: 'heridas', label: 'Heridas', checked: formData.heridas },
          ]}
          onChange={handleChange}
        />
        <InputField label="Personalidad" name="personalidad" value={formData.personalidad} onChange={handleChange} required />
        <InputField label="Recordatorio" name="recordatorio" value={formData.recordatorio} onChange={handleChange} />
        <InputField label="Nota" name="nota" type="number" value={formData.nota} onChange={handleChange} required />
        <InputField label="Nodos" name="nodos" type="number" value={formData.nodos} onChange={handleChange} />
        <ImageUploadField label="Imagen Antes" name="imagenAntes" onChange={handleChange} />
        <ImageUploadField label="Imagen Después" name="imagenDespues" onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Notas Adicionales</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={notaAdicional}
            onChange={(e) => setNotaAdicional(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddNotaAdicional}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md"
          >
            Añadir
          </button>
        </div>
        <ul className="list-disc pl-5">
          {formData.notasAdicionales.map((nota, index) => (
            <li key={index} className="flex justify-between items-center">
              {nota}
              <button
                type="button"
                onClick={() => handleRemoveNotaAdicional(index)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : mascota?._id ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}