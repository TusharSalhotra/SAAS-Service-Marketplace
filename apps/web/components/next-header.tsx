'use client';

import { Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function NextHeader() {
  const pathname = usePathname();
  const isEnrollmentPage = pathname === '/enrollment-form' || pathname === '/office-enrollment';

  if (isEnrollmentPage) return null;

  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Registration Form Workspace</p>
        <h1>Registration Form</h1>
      </div>
      <div className="header-actions" aria-label="Header actions">
        <Search size={18} />
        <Bell size={18} />
      </div>
    </header>
  );
}
