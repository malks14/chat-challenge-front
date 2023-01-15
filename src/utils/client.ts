import axios from "axios";

const apiClient = axios.create({
  // URL para variable de entorno
  baseURL: "http://localhost:8080/"
});

export default apiClient;