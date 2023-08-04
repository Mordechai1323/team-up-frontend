import axios from 'axios';
export const BASE_URL = 'http://localhost:3002';
// export const BASE_URL = 'https://team-up-7npr.onrender.com';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

