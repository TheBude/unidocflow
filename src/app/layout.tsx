import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SamDU UniDocFlow — Samarqand Davlat Universiteti Qog‘ozsiz Hujjat Ekotizimi",
  description: "Sharof Rashidov nomidagi Samarqand davlat universiteti yagona elektron hujjatlar aylanmasi va ma’lumotnomalar platformasi",
  icons: {
    icon: "/samdu-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
