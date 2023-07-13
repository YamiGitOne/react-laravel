import axios from "axios"

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  if (token) {
    // Verificar si el token es válido aquí
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

console.log("URL base:", axiosClient.defaults.baseURL);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      if (response.status === 401) {
        // Manejar el error de autenticación aquí
        localStorage.removeItem('ACCESS_TOKEN');
        // Mostrar un mensaje al usuario o redirigir a la página de inicio de sesión
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  }
);


export default axiosClient