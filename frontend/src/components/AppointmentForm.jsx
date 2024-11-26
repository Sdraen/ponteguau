import { useState, useEffect } from 'react';
import { format, parse, isWithinInterval, startOfWeek, addDays, isSameDay, addMinutes } from 'date-fns';
import { es } from 'date-fns/locale';
import { createAppointment, getAvailableTimeSlots } from '../services/appointment.service';
import MascotaForm from './MascotaForm';
import { createMascota, getMascotas } from '../services/mascota.service';

const AppointmentForm = () => {
  const [service, setService] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [showPetForm, setShowPetForm] = useState(false);
  const [pets, setPets] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Cargar mascotas del usuario
        const fetchedPets = await getMascotas();
        setPets(fetchedPets);

        // Cargar horarios disponibles
        const fetchedSlots = await getAvailableTimeSlots();
        setAvailableTimeSlots(fetchedSlots);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dayOfWeek = format(date, 'EEEE', { locale: es });
    const slotsForDay = availableTimeSlots.filter(slot => slot.day.toLowerCase() === dayOfWeek.toLowerCase());
    setSelectedTimeSlot(null);
    setTime('');
    setAvailableTimeSlots(slotsForDay);
  };

  const handleTimeChange = (e) => {
    const [slotId, selectedTime] = e.target.value.split('|');
    const slot = availableTimeSlots.find(s => s.id === slotId);
    setSelectedTimeSlot(slot || null);
    setTime(selectedTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTimeSlot || !selectedDate || !selectedPet) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const appointmentData = {
      service,
      petId: selectedPet,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time,
    };

    try {
      const response = await createAppointment(appointmentData);
      alert('Cita registrada con éxito. Se ha enviado un correo de confirmación.');
      console.log('Cita creada:', response);
      resetForm();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Ocurrió un error al registrar la cita.');
    }
  };

  const resetForm = () => {
    setService('');
    setSelectedPet('');
    setSelectedDate(null);
    setTime('');
    setSelectedTimeSlot(null);
  };

  const handleAddPet = async (newPet) => {
    try {
      const savedPet = await createMascota(newPet);
      setPets([...pets, savedPet]);
      setShowPetForm(false);
      setSelectedPet(savedPet._id);
    } catch (error) {
      console.error('Error creating new pet:', error);
      alert('Ocurrió un error al agregar la mascota.');
    }
  };

  const generateTimeOptions = () => {
    if (!selectedTimeSlot) return [];

    const { startTime, endTime, appointmentDuration } = selectedTimeSlot;
    const options = [];
    let currentTime = parse(startTime, 'HH:mm', new Date());
    const endTimeDate = parse(endTime, 'HH:mm', new Date());

    while (isWithinInterval(currentTime, { start: currentTime, end: endTimeDate })) {
      options.push(
        <option key={format(currentTime, 'HH:mm')} value={`${selectedTimeSlot.id}|${format(currentTime, 'HH:mm')}`}>
          {format(currentTime, 'HH:mm')}
        </option>
      );
      currentTime = addMinutes(currentTime, appointmentDuration);
    }

    return options;
  };

  const renderWeek = () => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentWeek, i);
      const dayOfWeek = format(date, 'EEEE', { locale: es });
      const hasSlots = availableTimeSlots.some(slot => slot.day.toLowerCase() === dayOfWeek.toLowerCase());
      week.push(
        <div
          key={i}
          className={`col text-center cursor-pointer ${
            hasSlots ? 'bg-light' : 'bg-secondary text-white'
          } ${selectedDate && isSameDay(date, selectedDate) ? 'bg-primary text-white' : ''}`}
          onClick={() => hasSlots && handleDateSelect(date)}
        >
          <div>{format(date, 'EEE', { locale: es })}</div>
          <div>{format(date, 'd')}</div>
          {hasSlots ? <small className="text-success">Disponible</small> : <small className="text-danger">No disponible</small>}
        </div>
      );
    }
    return week;
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Agendar Cita</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="service" className="form-label">Tipo de Servicio</label>
                  <select
                    id="service"
                    className="form-select"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un servicio</option>
                    <option value="baño">Baño</option>
                    <option value="corte">Recorte</option>
                    <option value="baño_y_corte">Baño y Recorte</option>
                    <option value="deslanado">Deslanado</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="pet" className="form-label">Mascota</label>
                  <div className="input-group">
                    <select
                      id="pet"
                      className="form-select"
                      value={selectedPet}
                      onChange={(e) => setSelectedPet(e.target.value)}
                      required
                    >
                      <option value="">Seleccione una mascota</option>
                      {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>{pet.nombre}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowPetForm(true)}
                      className="btn btn-outline-secondary"
                    >
                      Agregar Mascota
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <button type="button" onClick={goToPreviousWeek} className="btn btn-link">&lt; Semana anterior</button>
                    <span>{format(currentWeek, 'MMMM yyyy', { locale: es })}</span>
                    <button type="button" onClick={goToNextWeek} className="btn btn-link">Semana siguiente &gt;</button>
                  </div>
                  <div className="row g-1">
                    {renderWeek()}
                  </div>
                </div>
                {selectedDate && (
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">Hora</label>
                    <select
                      id="time"
                      className="form-select"
                      value={`${selectedTimeSlot?.id}|${time}`}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="">Seleccione una hora</option>
                      {generateTimeOptions()}
                    </select>
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  Agendar Cita
                </button>
              </form>

              {showPetForm && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Agregar Nueva Mascota</h5>
                        <button type="button" className="btn-close" onClick={() => setShowPetForm(false)}></button>
                      </div>
                      <div className="modal-body">
                        <MascotaForm
                          onSuccess={handleAddPet}
                          onCancel={() => setShowPetForm(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;