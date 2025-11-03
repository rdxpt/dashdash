'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NeuroVED - Advanced NeuroVEDical AI Platform</title>
        <meta name="description" content="AI-powered NeuroVEDical assistance platform revolutionizing healthcare through advanced machine learning and clinical decision support." />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {!isDashboard && <Navigation />}
            <main className="min-h-screen bg-background">{children}</main>
            {!isDashboard && <Footer />}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}