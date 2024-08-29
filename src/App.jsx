import { useState, useEffect } from 'react';
import Form from './components/Form';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const App = () => {
  const [ticketNumber, setTicketNumber] = useState(1);
  const [records, setRecords] = useState([]);
  const [resetForm, setResetForm] = useState(false); // Nuevo estado para resetear el formulario

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastReset = localStorage.getItem('lastResetDate');

    if (lastReset !== today) {
      setTicketNumber(1);
      localStorage.setItem('lastResetDate', today);
    } else {
      const savedTicketNumber = parseInt(localStorage.getItem('currentTicketNumber'), 10);
      if (savedTicketNumber) {
        setTicketNumber(savedTicketNumber);
      }
    }
  }, []);

  const handleFormSubmit = async (formData) => {
    const newRecord = {
      id: records.length + 1,
      ticket_number: ticketNumber,
      ...formData,
    };

    setRecords([...records, newRecord]);
    setTicketNumber(ticketNumber + 1);
    localStorage.setItem('currentTicketNumber', ticketNumber + 1);

    // Guardar en la base de datos
    try {
      await axios.post('http://localhost:5000/api/saveRecord', newRecord);
    } catch (error) {
      console.error('Error al guardar el registro:', error);
    }

    // Generar PDF del ticket
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [80, 120] // Tamaño típico de un ticket
    });
    // Agrega más elementos gráficos como bordes, rectángulos, etc.
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 230);
    doc.rect(5, 5, 70, 110, 'FD'); // Rectángulo con borde y relleno

    doc.setFontSize(16);
    doc.setTextColor(40, 55, 71); // Cambia el color del texto
    doc.text(`Ticket Número: ${ticketNumber}`, 10, 20);
  
    doc.setFontSize(12);
    doc.setTextColor(67, 160, 71); // Color para el nombre
    doc.text(`Nombre: ${formData.first_name} ${formData.last_name}`, 10, 40);
  
    doc.setTextColor(69, 90, 100); // Otro color para tipo de cliente
    doc.text(`Tipo de Cliente: ${formData.buyer_type}`, 10, 60);
  
    doc.setDrawColor(100, 100, 100);
    doc.line(10, 30, 70, 30); // Línea horizontal

    
    doc.save(`ticket-${ticketNumber}.pdf`);
     // Resetea el formulario
     setResetForm(true);
     setTimeout(() => setResetForm(false), 0); // Permite que el componente `Form` se re-renderice
  };

  // El return del JSX debe estar dentro de la función App
  return (
    <div>
      <h1>Formulario de Cliente</h1>
      <Form onSubmit={handleFormSubmit} reset={resetForm} />
      <div id="ticket" style={{ fontSize: '48px', marginTop: '20px' }}>
        Ticket Número: {ticketNumber}
      </div>
    </div>
  );
};

export default App;
