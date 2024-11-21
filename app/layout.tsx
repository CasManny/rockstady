import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/providers/ToastProvider";
import ExitModal from "@/components/modals/ExistLessonModal";
import HeartModal from "@/components/modals/HeartModal";
import { Suspense } from "react";
import AddBookModal from "@/components/modals/AddBookModal";
import FeedbackModal from "@/components/modals/FeedbackModal";
import PracticeModal from "@/components/modals/PracticeModal";
import { ThemeProvider } from "@/providers/theme-provide";
import { ConvexClientProvider } from "../providers/convex-client-provider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'

const poppins = Poppins({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillSquare",
  description:
    "Level up your reading game with Rockstady’s engaging book summaries and quizzes.",
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
          className={`${poppins.className} antialiased h-full dark:bg-rs-bg-dark`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <>
              <ConvexClientProvider>{children}</ConvexClientProvider>
              <ToastProvider />
              <Toaster />
              <ExitModal />
              <HeartModal />
              <AddBookModal />
              <FeedbackModal />
              <PracticeModal />
            </>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
