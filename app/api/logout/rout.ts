import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const expiredCookie = serialize("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
  });

  return NextResponse.json({ message: "Logged out" }, {
    headers: {
      "Set-Cookie": expiredCookie,
    },
  });
}
