import axios, { AxiosInstance } from 'axios';

const Api: AxiosInstance = axios.create({
  baseURL: 'http://vacationvista.cloud/api',
  withCredentials: true
});

export default Api;