import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL + '/api';



// app/api/api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
  withCredentials: true, // також додаємо цей параметр
});

import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});
import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>

export const api = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
});