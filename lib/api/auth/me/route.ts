import { NextResponse } from 'next/server';
import { getServerMe } from '../../serverApi';

export async function GET() {
  try {
    const user = await getServerMe();

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}