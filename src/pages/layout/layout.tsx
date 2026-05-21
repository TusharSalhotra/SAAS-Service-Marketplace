import type { ReactNode } from 'react';
import type { AppRoute } from '../../routes/routes';
import Footer from './components/footer';
import Header from './components/header';
import Sidebar from './components/sidebar';

type LayoutProps = {
  activeRoute: AppRoute;
  children: ReactNode;
  onNavigate: (route: AppRoute) => void;
};

export default function Layout({ activeRoute, children, onNavigate }: LayoutProps) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
      <div className="app-main">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
