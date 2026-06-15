import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export type ApiError = {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
  status?: number;
};