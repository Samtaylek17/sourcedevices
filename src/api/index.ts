import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://dummyapi.io/data/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    const settings = config;
    const appId: string | undefined = process.env.REACT_APP_DUMMY_APP_ID;

    if (appId) {
      settings.headers = {
        'app-id': `${process.env.REACT_APP_DUMMY_APP_ID}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
