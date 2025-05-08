import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connect from "@/lib/connect";
// إذا كان route.ts داخل app/routes/
import User from "../../models/user"; // لأن models موجود في مستوى أعلى
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_EXPIRES = 90 * 60;

const generateToken = ({ id }: { id: any }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES,
  });
};

export async function POST(req: NextRequest) {
  await connect();

  const data = await req.json();
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { error: "Incorrect email or password!" },
      { status: 401 }
    );
  }

  const token = generateToken({ id: user._id });

  const response = NextResponse.json(
    { success: "Login successful", data: user },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: JWT_EXPIRES,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
