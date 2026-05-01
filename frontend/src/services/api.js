import axios from 'axios';
import { CONFIG } from './config';

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = async (session, query) => {
  try {
    const response = await api.post('/chat', { session_id: session, message: query });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;
