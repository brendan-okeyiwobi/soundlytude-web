// app/layout.tsx

import './globals.css';
import Header from '@/components/header/Header';
import { PageProvider } from '@/components/PageContext';
import LoadingIndicator from "@/components/LoadingIndicator";
import { ReactNode } from 'react';
import Footer from '@/components/footer/Footer';

const description = `Soundlytude is a music streaming service created to provide a platform to showcase DJ bon26's music plus a curated selection of music from 
talented artists who I've partnered with. In Soundlytude, you can officially access DJ bon26 exclusive tracks `
// const logo = "/assets/images/logos/(fade) Favicon.png"

export const metadata = {
  title: 'Soundlytude',
  description: description,
  icons: {
    icon: [
      { url: '/favicons/lytude-favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicons/lytude-favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/lytude-favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: '/favicons/lytude-favicon/apple-touch-icon.png',
  },
  manifest: '/favicons/lytude-favicon/site.webmanifest',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7099FF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageProvider>
          <LoadingIndicator />
          <Header />
          {children}
          <Footer/>
        </PageProvider>
      </body>
    </html>
  );
}
