import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ weight: ["300", "400", "700"], subsets: ["latin"] });

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/lib/QueryProvider";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Genius Gaming",
  description: "this is a gaming website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ✅ ThemeProvider يجب أن يكون هنا داخل body */}
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover={false}
              theme="dark"
            />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
