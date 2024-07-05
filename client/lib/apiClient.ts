import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5001", // API server
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
