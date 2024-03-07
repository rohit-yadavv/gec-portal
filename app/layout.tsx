// import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Gec Portal",
  description: "Portal to register for gec designed for cuh students",
  icons: {
    icon: "/assets/images/full-logo.png",
  },
  openGraph: {
    images: ["/assets/images/full-logo.png", "/assets/images/logo.png/"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider> 
        <ThemeProvider>
          <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
              {children}
              <Toaster />
            </body>
          </html>
        </ThemeProvider> 
    </AuthProvider>
  );
}
