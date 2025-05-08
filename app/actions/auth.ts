"use server";

import User from "../models/user";
import connect from "./connet";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; // استخدم NextResponse
import { cookies } from "next/headers"; // استيراد cookies بشكل صحيح من next/headers

const JWT_EXPIRES = 90 * 60; // 90 دقيقة

// توليد التوكن
const generateToken = ({ id }: { id: any }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES,
  });
};

// تسجيل مستخدم جديد
export const signup = async (data: any) => {
  try {
    await connect();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({ ...data, password: hashedPassword });
    return { success: "User created successfully" };
  } catch (error: any) {
    console.error(error);
    return { error: "User creation failed", details: error.message };
  }
};

// تسجيل الدخول
export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) return { error: "User not found" };

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return { error: "Incorrect email or password!" };

    const token = generateToken({ id: user._id });

    // استخدام NextResponse لإنشاء استجابة مع الكوكيز
    const response = NextResponse.json({ success: "Login successful" });

    // تعيين الكوكيز باستخدام NextResponse
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // تأكيد الاستخدام الآمن إذا كنت في بيئة إنتاج
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return { error: "Login failed", details: error.message };
  }
};

// التحقق من الجلسة
export const protect = async () => {
  const cookieStore = await cookies(); // تأكد من استخدام await هنا للحصول على القيمة بشكل صحيح
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: "You are not authorized to perform this action!" };
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return { decode };
  } catch (error) {
    return { error: "Invalid or expired token!" };
  }
};

// الحصول على بيانات المستخدم
export const getUser = async () => {
  try {
    await connect();
    const { decode, error } = await protect();

    if (error || !decode?.id) {
      return { error: "You are not authorized to perform this action!" };
    }

    const user = await User.findById(decode.id);
    if (!user) return { error: "User not found" };

    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch (error) {
    return { error: "Failed to get user" };
  }
};

// تسجيل الخروج
export const logout = async () => {
  try {
    // استخدام NextResponse لإنشاء استجابة مع الكوكيز
    const response = NextResponse.json({ success: "Logout successful" });

    // تعيين الكوكيز لإزالته عند تسجيل الخروج
    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0, // إزالة الكوكيز
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // تأكيد الاستخدام الآمن في بيئة الإنتاج
    });

    return response;
  } catch (error) {
    return { error: "Logout failed" };
  }
};









// "use server";
// import User from "../models/user";
// import connect from "./connet";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// const JWT_EXPIRES = 90 * 60;
// const generateToken = async ({ id }: { id: any }) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!!, {
//     expiresIn: JWT_EXPIRES,
//   });
// };
// export const signup = async (data: any) => {
//   try {
//     await connect();
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const user = await User.create({ ...data, password: hashedPassword });
//     return { success: "User created successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { error: "User creation failed", details: error.message };
//   }
// };
// export const login = async (data: { email: string; password: string }) => {
//   try {
//     await connect();
//     const cookie = await cookies();
//     console.log(data);
//     const user = await User.findOne({ email: data.email }).select("+password");
//     console.log(user);
//     if (!user) {
//       return { error: "User not found" };
//     }
//     const isMatch = await bcrypt.compare(data.password, user.password);
//     if (!isMatch) {
//       return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
//     }
//     const userObj = JSON.parse(JSON.stringify(user));
//     const token = await generateToken({ id: user._id });
//     console.log(token);
//     cookie.set("token", token, {
//       httpOnly: true,
//       maxAge: JWT_EXPIRES,
//       sameSite: "none",
//       path: "/",
//       secure: true,
//     });

//     return { success: "Login successful", data: userObj };
//   } catch (error: any) {
//     console.log(error);
//     return { error: "Login failed", details: error.message };
//   }
// };
// // review game update
// export const protect = async () => {
//   const cookie = await cookies();
//   const token = cookie.get("token")?.value;
//   if (!token) return { error: "you are not authorized to preform this action"! };
//   let decode;
//   decode = jwt.verify(token, process.env.JWT_SECRET!!);
//   if (!decode) return { error: "you are not authorized to preform this action"! };
//   return { decode };
// };
// export const getUser = async () => {
//   try {
//     connect();
//     const { decode } = await protect();
//     const user = await User.findById((decode as any).id);
//     if (!user) return { error: "you are not authorized to preform this action"! };
//     const userObj = JSON.parse(JSON.stringify(user));
//     return { data: userObj };
//   } catch (error) {
//     return { error: "you are not authorized to preform this action"! };
//   }
// };
// export const logout = async () => {
//   try {
//     (await cookies()).delete("token");
//     return { success: "Logout successful" };
//   } catch (error) {
//     return { error: "Logout failed" };
//   }
// };
