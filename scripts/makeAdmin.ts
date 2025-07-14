import connect from "../app/actions/connet";
import User from "../app/models/user";

async function makeMeAdmin(email: string) {
  await connect();
  const updated = await User.findOneAndUpdate(
    { email },
    { role: "admin" },
    { new: true }
  );
  console.log("✅ User updated:", updated);
}

// استدعاء الوظيفة هنا مباشرة

makeMeAdmin("raed@gmail.com");
