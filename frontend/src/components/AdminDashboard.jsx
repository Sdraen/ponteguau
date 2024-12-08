import { useState, useEffect } from "react";
import { Edit, Trash2, Save, X } from "lucide-react";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const mockClients = [
      {
        id: "1",
        name: "Juan Pérez",
        email: "juan@example.com",
        phone: "123456789",
        pets: [
          { id: "1", name: "Max", species: "Perro", breed: "Labrador", age: 5 },
          { id: "2", name: "Luna", species: "Gato", breed: "Siamés", age: 3 },
        ],
      },
      {
        id: "2",
        name: "María García",
        email: "maria@example.com",
        phone: "987654321",
        pets: [
          { id: "3", name: "Rocky", species: "Perro", breed: "Bulldog", age: 2 },
        ],
      },
    ];
    setClients(mockClients);
  }, []);

  const handleEditClient = (clientId) => setEditingClient(clientId);

  const handleSaveClient = (client) => {
    setClients(
      clients.map((c) => (c.id === client.id ? client : c))
    );
    setEditingClient(null);
  };

  const handleEditPet = (petId) => setEditingPet(petId);

  const handleSavePet = (clientId, pet) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              pets: client.pets.map((p) =>
                p.id === pet.id ? pet : p
              ),
            }
          : client
      )
    );
    setEditingPet(null);
  };

  const handleDeleteClient = (clientId) =>
    setClients(clients.filter((client) => client.id !== clientId));

  const handleDeletePet = (clientId, petId) => {
    setClients(
      clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              pets: client.pets.filter((pet) => pet.id !== petId),
            }
          : client
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Panel de Administración
      </h1>
      {clients.map((client) => (
        <div key={client.id} className="bg-white shadow-md rounded-lg p-4 mb-6">
          {editingClient === client.id ? (
            <div>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                value={client.name}
                onChange={(e) =>
                  setClients(
                    clients.map((c) =>
                      c.id === client.id
                        ? { ...c, name: e.target.value }
                        : c
                    )
                  )
                }
              />
              <input
                type="email"
                className="border p-2 rounded w-full mb-2"
                value={client.email}
                onChange={(e) =>
                  setClients(
                    clients.map((c) =>
                      c.id === client.id
                        ? { ...c, email: e.target.value }
                        : c
                    )
                  )
                }
              />
              <input
                type="tel"
                className="border p-2 rounded w-full mb-2"
                value={client.phone}
                onChange={(e) =>
                  setClients(
                    clients.map((c) =>
                      c.id === client.id
                        ? { ...c, phone: e.target.value }
                        : c
                    )
                  )
                }
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleSaveClient(client)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={() => setEditingClient(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{client.name}</h2>
                <p>{client.email}</p>
                <p>{client.phone}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClient(client.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )}
          <h3 className="mt-4 font-semibold">Mascotas</h3>
          {client.pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-gray-100 rounded p-2 my-2 flex justify-between items-center"
            >
              {editingPet === pet.id ? (
                <div className="flex-1">
                  <input
                    type="text"
                    className="border p-2 rounded w-full mb-2"
                    value={pet.name}
                    onChange={(e) =>
                      setClients(
                        clients.map((c) =>
                          c.id === client.id
                            ? {
                                ...c,
                                pets: c.pets.map((p) =>
                                  p.id === pet.id
                                    ? { ...p, name: e.target.value }
                                    : p
                                ),
                              }
                            : c
                        )
                      )
                    }
                  />
                  {/* Add other fields similarly */}
                </div>
              ) : (
                <div>
                  <p>
                    {pet.name} - {pet.species} ({pet.breed}), {pet.age} años
                  </p>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPet(pet.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeletePet(client.id, pet.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
