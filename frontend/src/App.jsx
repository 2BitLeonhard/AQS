// src/App.jsx
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa o estilo padrão
import './App.css'; // Podemos personalizar mais aqui

function App() {
  // 'useState' é um Hook do React para guardar estado no componente
  const [date, setDate] = useState(new Date());

  return (
    <>
      <h1>Agendamento Inteligente 🗓️</h1>
      <div className="card">
        <h2>Selecione uma data:</h2>
        <Calendar onChange={setDate} value={date} />
      </div>
      <p className="read-the-docs">
        Data selecionada: {date.toLocaleDateString('pt-BR')}
      </p>
    </>
  )
}

export default App;