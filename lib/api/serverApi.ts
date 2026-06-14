// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { nextServer } from './api';

import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export async function fetchNoteById(
  id: string
): Promise<Note> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}