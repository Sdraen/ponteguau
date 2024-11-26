import axios from './root.service';

// Obtener todas las citas del usuario
export const getUserAppointments = async () => {
  const { data } = await axios.get('/appointments');
  return data.data;
};

// Obtener una cita por ID
export const getAppointmentById = async (id) => {
  const { data } = await axios.get(`/appointments/${id}`);
  return data.data;
};

// Crear una nueva cita
export const createAppointment = async (appointmentData) => {
  const { data } = await axios.post('/appointments', appointmentData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
};

// Actualizar una cita por ID
export const updateAppointment = async (id, appointmentData) => {
  const { data } = await axios.put(`/appointments/${id}`, appointmentData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
};

// Eliminar una cita por ID
export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(`/appointments/${id}`);
  return data.data;
};

// Obtener horarios disponibles para las citas
export const getAvailableTimeSlots = async () => {
  const { data } = await axios.get('/appointments/timeslots');
  return data.data;
};