import { cookies } from 'next/headers';

import { api } from './api';

import type { User } from '@/types/user';
import type { Note } from '@/types/note';

type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

type FetchNotesParams = {
  search?: string;
  page?: number;
  tag?: string;
};

export async function fetchNotes({
  search = '',
  page = 1,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const response = await api.get('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const cookieStore = await cookies();

  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const response = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function checkSession(): Promise<User | null> {
  const cookieStore = await cookies();

  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data ?? null;
}