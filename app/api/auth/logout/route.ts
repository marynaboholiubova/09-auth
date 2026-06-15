import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "../../api";
import { logErrorResponse } from "../../_utils/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();

    await api.post("auth/logout", null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }

    logErrorResponse({ message: (error as Error).message });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}