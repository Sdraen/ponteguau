import Appointment from '../models/Appointment.js'; // Asegúrate de que la ruta sea correcta

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Cita creada exitosamente', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
};

// Obtener todas las citas
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email') // Ajusta los campos según el modelo User
      .populate('petId', 'nombre raza') // Ajusta los campos según el modelo Mascota
      .populate('serviceId', 'name price'); // Ajusta los campos según el modelo Service
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error });
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id)
      .populate('userId', 'name email')
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la cita', error });
  }
};

// Actualizar una cita por ID
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true })
      .populate('userId', 'name email')
      .populate('petId', 'nombre raza')
      .populate('serviceId', 'name price');
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita actualizada exitosamente', updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
};

// Eliminar una cita por ID
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada exitosamente', deletedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
};