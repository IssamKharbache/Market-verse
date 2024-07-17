import type { Metadata } from "next";
import {Roboto } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Header from "@/components/navbar/Header";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { authOptions } from "./api/auth/[...nextauth]/option";

const inter = Roboto({ subsets: ["latin"] ,weight:["100","300","400","500","700","900"] });

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
