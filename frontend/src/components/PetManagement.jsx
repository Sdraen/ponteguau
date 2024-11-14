import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, AlertCircle } from 'lucide-react';
import MascotaForm from './MascotaForm';
import { getMascotas, getMascotaById, createMascota, updateMascota, deleteMascota } from '../services/mascota.service';

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const mascotas = await getMascotas();
        setPets(mascotas);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las mascotas. Por favor, intente nuevamente.');
        console.error('Error al obtener las mascotas:', err);
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = () => {
    setSelectedPet(null);
    setShowForm(true);
  };

  const handleEditPet = async (pet) => {
    try {
      const petData = await getMascotaById(pet._id);
      setSelectedPet(petData);
      setShowForm(true);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos de la mascota');
      console.error('Error al obtener los datos de la mascota:', err);
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('¿Está seguro que desea eliminar esta mascota?')) {
      try {
        await deleteMascota(petId);
        setPets(pets.filter(pet => pet._id !== petId));
        setError(null);
      } catch (err) {
        setError('Error al eliminar la mascota');
        console.error('Error al eliminar la mascota:', err);
      }
    }
  };

  const handleSubmit = async (petData) => {
    try {
      if (selectedPet) {
        const updatedPet = await updateMascota(selectedPet._id, petData);
        setPets(pets.map(p => p._id === selectedPet._id ? updatedPet : p));
      } else {
        const newPet = await createMascota(petData);
        setPets([...pets, newPet]);
      }
      setShowForm(false);
      setSelectedPet(null);
      setError(null);
    } catch (err) {
      setError('Error al guardar la mascota');
      console.error('Error al procesar la mascota:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12">
      <div className="max-w-5xl w-full">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Gestión de Mascotas</h2>
              <button
                onClick={handleAddPet}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Nueva Mascota
              </button>
            </div>
  
            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}
  
            {showForm && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <MascotaForm
                  mascota={selectedPet}
                  onSuccess={handleSubmit}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            )}
  
            <div className="space-y-4">
              {pets.map(pet => (
                <div
                  key={pet._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{pet.nombre}</h3>
                      <div className="mt-1 text-sm text-gray-600">
                        <span className="inline-block mr-4">{pet.raza}</span>
                        <span className="inline-block mr-4">{pet.edad} años</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPet(pet)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                        title="Editar"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePet(pet._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
  
              {pets.length === 0 && !error && (
                <div className="text-center py-12 text-gray-500">
                  No hay mascotas registradas. ¡Agrega una nueva!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetManagement;