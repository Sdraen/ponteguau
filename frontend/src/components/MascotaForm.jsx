import { useForm } from 'react-hook-form';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { createMascota, updateMascota } from '../services/mascota.service';
import toast from 'react-hot-toast';

export default function MascotaForm({ mascota, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: mascota || {
      chip: false,
      esterilizado: false,
      otitis: false,
      pulgas: false,
      heridas: false,
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Añadir todos los campos del formulario al FormData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Añadir imágenes si existen
      if (data.imagenAntes && data.imagenAntes[0]) {
        formData.append('imagenAntes', data.imagenAntes[0]);
      }
      if (data.imagenDespues && data.imagenDespues[0]) {
        formData.append('imagenDespues', data.imagenDespues[0]);
      }

      // Llamar a la función de servicio correspondiente
      const response = mascota?._id
        ? await updateMascota(mascota._id, formData)
        : await createMascota(formData);

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">{mascota ? 'Editar Mascota' : 'Registrar Nueva Mascota'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Nombre" name="nombre" register={register} errors={errors} required />
        <InputField label="Fecha de Nacimiento" name="fecha_nacimiento" type="date" register={register} errors={errors} required />
        <InputField label="Edad" name="edad" type="number" register={register} errors={errors} required />
        <SelectField label="Sexo" name="sexo" register={register} errors={errors} options={['Macho', 'Hembra']} required />
        <InputField label="Raza" name="raza" register={register} errors={errors} required />
        <InputField label="Peso" name="peso" type="number" step="0.1" register={register} errors={errors} required />
        
        <TextAreaField label="Enfermedades" name="enfermedades" register={register} errors={errors} rows="3" required />
        
        <CheckboxGroup label="Características" items={[
          { name: 'chip', label: 'Chip' },
          { name: 'esterilizado', label: 'Esterilizado' },
          { name: 'otitis', label: 'Otitis' },
          { name: 'pulgas', label: 'Pulgas' },
          { name: 'heridas', label: 'Heridas' },
        ]} register={register} />
        
        <InputField label="Personalidad" name="personalidad" register={register} errors={errors} />
        <InputField label="Recordatorio" name="recordatorio" register={register} errors={errors} />
        <InputField label="Nota" name="nota" type="number" register={register} errors={errors} />
        <InputField label="Nodos" name="nodos" type="number" register={register} errors={errors} />

        <ImageUploadField label="Imagen Antes" name="imagenAntes" register={register} />
        <ImageUploadField label="Imagen Después" name="imagenDespues" register={register} />
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

// Componente InputField
function InputField({ label, name, type = 'text', register, errors, required, step }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        step={step}
        {...register(name, { required: required && `${label} es requerido` })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  required: PropTypes.bool,
  step: PropTypes.string,
};

// Componente SelectField
function SelectField({ label, name, register, errors, options, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name, { required: required && `${label} es requerido` })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Seleccionar...</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

// Componente TextAreaField
function TextAreaField({ label, name, register, errors, rows, required }) {
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        {...register(name, { required: required && `${label} es requerido` })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows={rows}
      />
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
}

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  rows: PropTypes.number.isRequired,
  required: PropTypes.bool,
};

// Componente CheckboxGroup
function CheckboxGroup({ label, items, register }) {
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-4 mt-2">
        {items.map(item => (
          <label key={item.name} className="flex items-center">
            <input
              type="checkbox"
              {...register(item.name)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  register: PropTypes.func.isRequired,
};

// Componente ImageUploadField
function ImageUploadField({ label, name, register }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        className="mt-1 block w-full"
      />
    </div>
  );
}

ImageUploadField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

// Definición de los tipos de las props
MascotaForm.propTypes = {
  mascota: PropTypes.shape({
    _id: PropTypes.string,
    nombre: PropTypes.string.isRequired,
    fecha_nacimiento: PropTypes.string.isRequired,
    edad: PropTypes.number.isRequired,
    sexo: PropTypes.oneOf(['Macho', 'Hembra']).isRequired,
    raza: PropTypes.string.isRequired,
    peso: PropTypes.number.isRequired,
    chip: PropTypes.bool,
    esterilizado: PropTypes.bool,
    enfermedades: PropTypes.string.isRequired,
    otitis: PropTypes.bool,
    pulgas: PropTypes.bool,
    heridas: PropTypes.bool,
    personalidad: PropTypes.string.isRequired,
    recordatorio: PropTypes.string.isRequired,
    nota: PropTypes.number.isRequired,
    nodos: PropTypes.number.isRequired,
    imagenAntes: PropTypes.string,
    imagenDespues: PropTypes.string,
    propietario: PropTypes.string,
    historialCitas: PropTypes.arrayOf(PropTypes.string),
    notasAdicionales: PropTypes.arrayOf(PropTypes.string),
  }),
  onSuccess: PropTypes.func,
};