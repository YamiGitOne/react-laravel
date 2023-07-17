import axios from "axios"

const baseURL = "http://localhost:8000"; // Aquí se define la URL base
const axiosClient = axios.create({
  baseURL: baseURL
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (token) {
    // Verificar si el token es válido aquí
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const signup = async (payload) => {
  try {
    const data = await signup(payload);
    setUser(data.user);
    setToken(data.token);
  } catch (error) {  
    throw error;
  }
};


export default axiosClient