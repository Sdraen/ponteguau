// src/components/Calendar.jsx
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CitaService from '../services/cita.service';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las citas usando el servicio
  const loadCitas = async () => {
    try {
      const citas = await CitaService.getCitas();
      const formattedEvents = citas.map((cita) => ({
        id: cita._id,
        title: `${cita.mascota.nombre} - ${cita.servicio}`,
        start: new Date(cita.fecha),
        end: new Date(new Date(cita.fecha).getTime() + 60 * 60 * 1000), // Duración de 1 hora
      }));
      setEvents(formattedEvents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar citas cuando el componente se monta
  useEffect(() => {
    loadCitas();
  }, []);

  // Manejar el clic en un evento del calendario
  const handleEventClick = (info) => {
    alert(`Evento: ${info.event.title}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendario de Citas</h1>

      {/* Mostrar error si existe */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}

      {/* Componente de FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventClick={handleEventClick}
        locale="es"
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
