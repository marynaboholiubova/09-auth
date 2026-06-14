import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
});
import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
});
// app/api/api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
  withCredentials: true, // також додаємо цей параметр
});
