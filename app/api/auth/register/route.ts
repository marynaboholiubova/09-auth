// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { AxiosError, isAxiosError } from 'axios';
import { api } from '../../api';
import { parse } from 'cookie';

type ApiError = {
  error: string;
};

function logErrorResponse(error: AxiosError<ApiError>) {
  const status = error.response?.status;
  const data = error.response?.data;
  console.error('API error:', { status, data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const apiRes = await api.post('/auth/register', body);

    const response = NextResponse.json(apiRes.data);

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

      cookies.forEach((cookieStr) => {
        const parsedCookie = parse(cookieStr);
        const [name, value] = Object.entries(parsedCookie)[0];

        response.cookies.set(name, value, {
          expires: parsedCookie.Expires
            ? new Date(parsedCookie.Expires)
            : undefined,
          path: parsedCookie.Path,
          maxAge: parsedCookie['Max-Age']
            ? Number(parsedCookie['Max-Age'])
            : undefined,
        });
      });
    }

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


