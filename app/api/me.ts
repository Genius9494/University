// pages/api/me.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/app/actions/auth";  // تأكد من أن هذا المسار صحيح وملائم

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const user = await getUser();
      
      if (user.error) {
        return res.status(401).json({ error: user.error });
      }

      return res.status(200).json(user.data);  // إرجاع بيانات المستخدم إذا كانت موجودة
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
