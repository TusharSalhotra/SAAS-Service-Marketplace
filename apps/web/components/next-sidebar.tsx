'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store } from 'lucide-react';
import { routes } from '@shared/routes/routes';
import { cx } from '@shared/lib/utils';

export default function NextSidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">
          <Store size={20} />
        </span>
        <span>Registration Form</span>
      </div>
      <nav className="sidebar-nav">
        {routes.map((route) => (
          <Link key={route.path} className={cx(pathname === route.path && 'active')} href={route.path}>
            {route.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
