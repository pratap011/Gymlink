import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your actual backend base URL
    withCredentials: true, // if you're using cookies/sessions
  });
  
export default api;