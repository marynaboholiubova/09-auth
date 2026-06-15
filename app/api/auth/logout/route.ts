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

export async function POST() {
  try {
    const cookieStore = await cookies();

    const apiRes = await api.post('/auth/logout', null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const response = NextResponse.json(apiRes.data, { status: 200 });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
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