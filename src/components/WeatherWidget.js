// src/components/WeatherWidget.js
import React, { useState } from 'react';
import { getWeather } from '../services/api';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await getWeather(city);
      setWeather(data.data);
    } catch (err) {
      setError('No se pudo obtener el clima. Verifica la ciudad ingresada.');
      setWeather(null);
    }
  };

  return (
    <div style={styles.weatherContainer}>
      <h2>Clima</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
          placeholder="Ingresa una ciudad..."
        />
        <button type="submit" style={styles.button}>
          Buscar
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {weather && (
        <div style={styles.weatherInfo}>
          <h3>{weather.name}</h3>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Descripción: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  weatherContainer: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    maxWidth: '400px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    marginBottom: '10px',
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
  weatherInfo: {
    marginTop: '10px',
    padding: '10px',
    background: '#f9f9f9',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default WeatherWidget;
