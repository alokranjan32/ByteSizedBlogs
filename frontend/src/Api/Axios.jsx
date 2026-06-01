import axios from 'axios';

const API_URL = import.meta.env.PROD
  ? ''
  : import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${API_URL}/api/user`,
  withCredentials: true,
});

export default API;
