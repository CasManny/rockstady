import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { ClerkProvider } from  '@clerk/nextjs'
import ToastProvider from "@/providers/ToastProvider";
import ExitModal from "@/components/modals/ExistLessonModal";
import HeartModal from "@/components/modals/HeartModal";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import AddBookModal from "@/components/modals/AddBookModal";



const poppins = Poppins({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Rockstaddy",
  description: "Level up your reading game with Rockstady’s engaging book summaries and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
        >

          {children}
          <ToastProvider />
          <ExitModal />
          <HeartModal />
          <AddBookModal />
      </body>
    </html>

    </ClerkProvider>
  );
}
