import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function TopHeader({ title, subtitle }) {
  const { user, logout } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <p className="text-xs text-muted mb-1">
          {greeting()}, {firstName} 👋
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:grid w-10 h-10 rounded-full bg-primary-light text-primary place-items-center font-display font-semibold">
          {firstName.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={logout}
          className="text-xs font-medium text-muted hover:text-coral transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  );
}