import { useState, useEffect } from 'react';
import MascotaForm from './MascotaForm';
import { getMascotas, getMascotaById, createMascota, updateMascota, deleteMascota } from '../services/mascota.service';

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Obtener todas las mascotas al cargar el componente
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const mascotas = await getMascotas();
        setPets(mascotas);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
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
      const petData = await getMascotaById(pet._id); // Obtener la mascota por ID
      setSelectedPet(petData);
      setShowForm(true);
    } catch (error) {
      console.error('Error al obtener los datos de la mascota:', error);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await deleteMascota(petId);  // Llamar al servicio para eliminar la mascota
      setPets(pets.filter(pet => pet._id !== petId));  // Eliminar la mascota de la lista
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
    }
  };

  const handleSubmit = async (petData) => {
    try {
      if (selectedPet) {
        // Actualizar mascota
        await updateMascota(selectedPet._id, petData);
        setPets(pets.map(p => p._id === selectedPet._id ? { ...petData, _id: selectedPet._id } : p));
      } else {
        // Crear nueva mascota
        const newPet = await createMascota(petData);
        setPets([...pets, newPet]);
      }
      setShowForm(false);
      setSelectedPet(null);
    } catch (error) {
      console.error('Error al procesar la mascota:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Gestión de Mascotas</h2>
              
              <button
                onClick={handleAddPet}
                className="btn btn-success mb-4"
              >
                Agregar Nueva Mascota
              </button>

              {showForm && (
                <div className="mb-4">
                  <MascotaForm
                    mascota={selectedPet || undefined}
                    onSuccess={handleSubmit}
                    onCancel={() => setShowForm(false)}
                  />
                </div>
              )}

              <div className="list-group">
                {pets.map(pet => (
                  <div key={pet._id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">{pet.nombre}</h5>
                      <p className="mb-1">{pet.raza} - {pet.edad} años</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleEditPet(pet)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePet(pet._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetManagement;