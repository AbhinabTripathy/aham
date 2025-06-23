import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from './ClientWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aham Core",
  description: "Aham Core - Your Fashion Destination",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Aham Core',
    description: 'Your Fashion Destination',
    siteName: 'Aham Core',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
