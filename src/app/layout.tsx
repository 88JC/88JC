import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SoundEffect from "../components/SoundEffect";
import { Inter } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const personInfo = {
  name: "kydo",
  username: "88JC",
  description: "Hi! Welcome to my personal website.",
  domain: "jecky.id",
};

export const metadata: Metadata = {
  title: `${personInfo.name}`,
  description: `${personInfo.description}`,
  keywords: ["88JC", "Tech Enthusiast", "kydo", "portofolio", "personal website"],
  authors: [{ name: personInfo.name }],
  creator: personInfo.name,
  openGraph: {
    title: `${personInfo.name}`,
    description: `${personInfo.description}`,
    url: `https://${personInfo.domain}`,
    siteName: `${personInfo.name}'s Personal Website.`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personInfo.name}`,
    description: `${personInfo.description}`,
    creator: `@${personInfo.username}`,
  },
  icons: {
    icon: '/img/favicon.ico',
    apple: '/img/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (err) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-sans min-h-screen text-base`}
      >
        <SoundEffect />
        {children}
      </body>
    </html>
  );
}
