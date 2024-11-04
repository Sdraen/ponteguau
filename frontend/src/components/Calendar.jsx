import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
  Card,
  CardBody,
} from '@chakra-ui/react';
import citaService from '../services/cita.service';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadCitas();
  }, [loadCitas]);

  const loadCitas = async () => {
    try {
      const citas = await citaService.getCitas();
      const formattedEvents = citas.map((cita) => ({
        id: cita._id,
        title: `${cita.mascota.nombre} - ${cita.servicio}`,
        start: new Date(cita.fecha),
        end: new Date(new Date(cita.fecha).getTime() + 60 * 60 * 1000),
        extendedProps: {
          mascota: cita.mascota.nombre,
          propietario: cita.propietario.nombre,
          servicio: cita.servicio,
          notas: cita.notas,
          estado: cita.estado || 'pendiente',
        },
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Error al cargar las citas',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (info) => {
    const event = info.event;
    toast({
      position: 'top',
      duration: 5000,
      isClosable: true,
      render: () => (
        <Box p={4} bg="white" borderRadius="md" boxShadow="lg">
          <VStack align="stretch" spacing={2}>
            <Heading size="md">{event.title}</Heading>
            <HStack>
              <Text fontWeight="bold">Mascota:</Text>
              <Text>{event.extendedProps.mascota}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Propietario:</Text>
              <Text>{event.extendedProps.propietario}</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Servicio:</Text>
              <Text>{event.extendedProps.servicio}</Text>
            </HStack>
            {event.extendedProps.notas && (
              <HStack>
                <Text fontWeight="bold">Notas:</Text>
                <Text>{event.extendedProps.notas}</Text>
              </HStack>
            )}
            <HStack>
              <Text fontWeight="bold">Estado:</Text>
              <Text>{event.extendedProps.estado}</Text>
            </HStack>
          </VStack>
        </Box>
      ),
    });
  };

  if (loading) {
    return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <Card>
      <CardBody>
        <HStack spacing={2} mb={6}>
          <CalendarIcon size={24} color="blue" />
          <Heading size="lg">Calendario de Citas</Heading>
        </HStack>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          className="calendar-container"
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            eventClick={handleEventClick}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            locale="es"
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
            }}
            height="auto"
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default Calendar;