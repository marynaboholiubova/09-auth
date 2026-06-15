import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nextServer } from '@/lib/api/api';

export async function POST(request: Request) {
  const cookieStore = await cookies();

  try {
    const formData = await request.formData();

    const { data } = await nextServer.post('/upload', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    const err = error as {
      response?: {
        data?: {
          error?: string;
        };
        status?: number;
      };
      message?: string;
    };

    return NextResponse.json(
      {
        error: err.response?.data?.error ?? err.message ?? 'Upload failed',
      },
      { status: err.response?.status ?? 500 }
    );
  }
}