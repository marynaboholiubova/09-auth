
// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { AxiosError, isAxiosError } from 'axios';
import { api } from '../../api';
import { cookies } from 'next/headers';

type ApiError = {
  error: string;
};

function logErrorResponse(error: AxiosError<ApiError>) {
  const status = error.response?.status;
  const data = error.response?.data;
  console.error('API error:', { status, data });
}

export async function GET() {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, { status: 200 });
  } catch (error) {
    if (isAxiosError<ApiError>(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error: error.response?.data?.error ?? error.message,
        },
        {
          status: error.response?.status ?? 500,
        }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
