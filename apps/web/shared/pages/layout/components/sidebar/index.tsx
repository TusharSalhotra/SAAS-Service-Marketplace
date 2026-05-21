import { Store } from 'lucide-react';
import type { AppRoute } from '../../../../routes/routes';
import { routes } from '../../../../routes/routes';
import { cx } from '../../../../lib/utils';

type SidebarProps = {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

export default function Sidebar({ activeRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">
          <Store size={20} />
        </span>
        <span>Service Market</span>
      </div>
      <nav className="sidebar-nav">
        {routes.map((route) => (
          <button key={route.path} className={cx(activeRoute === route.path && 'active')} onClick={() => onNavigate(route.path)}>
            {route.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
