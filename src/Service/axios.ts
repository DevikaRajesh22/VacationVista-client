import axios, { AxiosInstance } from 'axios';

const Api: AxiosInstance = axios.create({
  baseURL: 'https://www.vacationvista.cloud/api',
  withCredentials: true
});

export default Api;