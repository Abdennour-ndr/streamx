import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamX - All-in-One Streaming Platform",
  description: "StreamX combines licensed movies, original productions, live streaming, and a content creator hub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-black text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
