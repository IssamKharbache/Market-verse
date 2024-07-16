import type { Metadata } from "next";
import {Nunito_Sans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Header from "@/components/navbar/Header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market verse",
  description: "Market place platform",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors position="top-center" />
        <NextTopLoader color="#698474" />
        <Header session={session} />
        {children}
        </body>
    </html>
  );
}
