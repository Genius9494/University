"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";
import MotionItem from "../defaults/MotionItem";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import Link from "next/link";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        // إرسال البيانات إلى API تسجيل الدخول
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // التحقق من استجابة الـ API
        const result = await res.json();

        if (res.ok) {
          // في حالة النجاح
          if (result.success) {
            toast.success(result.success);
            redirect("/"); // إعادة التوجيه إلى الصفحة الرئيسية أو الصفحة المناسبة
          } else {
            toast.error(result.error || "Login failed");
          }
        } else {
          // في حالة حدوث خطأ في استجابة الـ API
          toast.error(result.error || "Something went wrong. Please try again.");
        }
      } catch (error) {
        // التعامل مع أي خطأ يحدث أثناء الاتصال بـ API
        console.error("Login error:", error);
        toast.error("Something went wrong, please try again.");
      }
    });
  };

  return (
    <MotionItem animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} initial={{ opacity: 0, y: 100 }}>
      <MaxWidthWrapper customPadding={" py-14"} className="flex flex-col gap-4 items-center w-full bg-slate-900 rounded-2xl border border-input">
        <Logo />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="capitalize text-base font-semibold flex items-center gap-2">
          <p className="text-gray-50">Do not have an account ?!</p>
          <Link className="text-yellow-300 hover:underline" href={"/signup"}>
            Register With Us Now !
          </Link>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Login;



























// "use client";
// import React, { useTransition } from "react";
// import { useForm } from "react-hook-form";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import FormInput from "../FormInput";
// import MotionItem from "../defaults/MotionItem";
// import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
// import Logo from "../defaults/Logo";
// import Link from "next/link";
// import { login } from "@/app/actions/auth";
// import { toast } from "react-toastify";
// import { redirect } from "next/navigation";


// const loginSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email" }),
//   password: z.string().min(5, { message: "Password must be at least 5 characters" }),
// });

// const Login = () => {
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       password: "",
//       email: "",
//     },
//   });
//   const [isPending, startTransition] = useTransition();
//   const onSubmit = (data: z.infer<typeof loginSchema>) => {
//     console.log(data);
//     startTransition(async () => {
//       const res = await login(data);
//       console.log(res);
//       if (res.success) {
//         toast.success(res.success);
//         redirect("/");
//       } else toast.error(res.error);
//     });
//   };
//   return (
//     <MotionItem animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} initial={{ opacity: 0, y: 100 }}>
//       <MaxWidthWrapper
//         customPadding={" py-14"}
//         className=" flex flex-col gap-4 items-center w-full bg-slate-900 rounded-2xl border border-input"
//       >
        
//         <Logo />
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className=" flex  w-full flex-col gap-10">
//             <FormInput name="email" label="Email" type="text" />
//             <FormInput name="password" label="Password" type="password" />
//             <Button disabled={isPending} type="submit">
//               Submit
//             </Button>
//           </form>
//         </Form>
//         <div className="capitalize text-base font-semibold flex items-center gap-2">
//           <p className=" text-gray-50 ">Do not have an account ?!</p>{" "}
//           <Link className=" text-yellow-300 hover:underline" href={"/signup"}>
//             Register With Us Now !
//           </Link>
//         </div>
//       </MaxWidthWrapper>
//     </MotionItem>
//   );
// };

// export default Login;
