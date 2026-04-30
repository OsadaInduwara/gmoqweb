import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "GyrixAI | AI-Powered Software Solutions",
  description: "GyrixAI builds cutting-edge AI solutions, custom software, and intelligent digital products that drive measurable results for forward-thinking businesses.",
  keywords: ["GyrixAI", "AI", "Machine Learning", "Software Development", "Web Development", "Mobile Apps", "Data Analytics"],
  icons: {
    icon: [
      {
        url: '/images/logo.jpeg',
        type: 'image/jpeg',
      },
    ],
    apple: [
      {
        url: '/images/logo.jpeg',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
