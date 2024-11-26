import nodemailer from 'nodemailer';
import { ApiError } from './ApiError.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const templates = {
  appointmentConfirmation: (data) => `
    <h1>¡Gracias por agendar tu cita en Ponteguau!</h1>
    <p>Hola ${data.name},</p>
    <p>Tu cita ha sido confirmada con los siguientes detalles:</p>
    <ul>
      <li><strong>Fecha:</strong> ${new Date(data.appointment.date).toLocaleDateString()}</li>
      <li><strong>Hora:</strong> ${data.appointment.startTime}</li>
    </ul>
    <p>Recuerda:</p>
    <ul>
      <li>Llegar 10 minutos antes de tu cita</li>
      <li>Traer el carnet de vacunación de tu mascota</li>
      <li>Si necesitas cancelar o reprogramar, hazlo con al menos 24 horas de anticipación</li>
    </ul>
    <p>¡Nos vemos pronto!</p>
    <p>Equipo Ponteguau</p>
  `,
  
  appointmentCancellation: (data) => `
    <h1>Cancelación de Cita</h1>
    <p>Hola ${data.name},</p>
    <p>Tu cita ha sido cancelada:</p>
    <ul>
      <li><strong>Fecha:</strong> ${new Date(data.appointment.date).toLocaleDateString()}</li>
      <li><strong>Hora:</strong> ${data.appointment.startTime}</li>
    </ul>
    <p>Si deseas reagendar tu cita, puedes hacerlo a través de nuestra plataforma.</p>
    <p>¡Esperamos verte pronto!</p>
    <p>Equipo Ponteguau</p>
  `,
  
  appointmentReminder: (data) => `
    <h1>Recordatorio de Cita</h1>
    <p>Hola ${data.name},</p>
    <p>Te recordamos que tienes una cita programada para mañana:</p>
    <ul>
      <li><strong>Fecha:</strong> ${new Date(data.appointment.date).toLocaleDateString()}</li>
      <li><strong>Hora:</strong> ${data.appointment.startTime}</li>
    </ul>
    <p>¡Te esperamos!</p>
    <p>Equipo Ponteguau</p>
  `
};

export const sendEmail = async ({ email, subject, template, data }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html: templates[template](data)
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new ApiError(500, 'Email could not be sent');
  }
};