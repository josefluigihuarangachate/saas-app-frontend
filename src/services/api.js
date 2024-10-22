import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendMessageToChatbot = async (message) => {
  const response = await axios.post(`${API_URL}/chatbot/message`, { message });
  return response.data;
};

export const getWeather = async (city) => {
  const response = await axios.get(`${API_URL}/weather/${city}`);
  return response.data;
};
