import { Bell, Search } from 'lucide-react';

export default function Header() {
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
