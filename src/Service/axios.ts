import axios, { AxiosInstance } from 'axios';

const Api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

export default Api;