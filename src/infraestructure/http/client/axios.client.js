// src/infrastructure/http_client/axios.client.js
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3002",
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);