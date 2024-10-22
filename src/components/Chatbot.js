// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToChatbot } from '../services/api';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const messagesEndRef = useRef(null); // Crear referencia para el final de los mensajes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendMessageToChatbot(message);
    setResponses((prevResponses) => [
      ...prevResponses,
      { user: message, bot: data.response },
    ]);
    setMessage('');
  };

  // Desplazarse automáticamente hacia abajo cuando hay nuevos mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [responses]); // Ejecutar el efecto cuando las respuestas cambian

  return (
    <div style={styles.chatContainer}>
      <h2>Chatbot</h2>
      <div style={styles.messagesContainer}>
        {responses.map((response, index) => (
          <div key={index} style={styles.messageBubble}>
            <strong>Tú:</strong> {response.user}
            <br />
            <strong>Chatbot:</strong> {response.bot}
          </div>
        ))}
        {/* Referencia al final de la lista de mensajes */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" style={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
};

const styles = {
  chatContainer: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    maxWidth: '400px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  messagesContainer: {
    maxHeight: '168px',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  messageBubble: {
    background: '#f1f1f1',
    borderRadius: '5px',
    padding: '8px',
    margin: '5px 0',
  },
  form: {
    display: 'flex',
  },
  input: {
    flex: '1',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '5px',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Chatbot;
