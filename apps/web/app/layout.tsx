import type { Metadata } from 'next';
import './globals.css';
import NextSidebar from '../components/next-sidebar';
import NextHeader from '../components/next-header';
import NextFooter from '../components/next-footer';

export const metadata: Metadata = {
  title: 'Service Marketplace Platform',
  description: 'Multi-tenant registration form, services, payments, and analytics portal.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <NextSidebar />
          <div className="app-main">
            <NextHeader />
            <main>{children}</main>
            <NextFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
