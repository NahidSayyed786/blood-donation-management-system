import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/* OPTIONAL: request interceptor (future use) */
API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

/* GLOBAL error handling */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response || error.message);

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
