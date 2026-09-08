import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Home', icon: 'H' },
  { to: '/opportunities', label: 'Explore', icon: 'E' },
  { to: '/applications', label: 'Tracker', icon: 'T' },
  { to: '/calendar', label: 'Calendar', icon: 'C' },
  { to: '/profile', label: 'Profile', icon: 'P' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:shrink-0 border-r border-line bg-card px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-xl bg-primary text-white grid place-items-center font-display font-bold">
          C
        </div>
        <span className="font-display font-semibold text-lg">CampusHub</span>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-light text-primary'
                  : 'text-muted hover:bg-surface hover:text-ink'
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 py-4 rounded-xl2 bg-primary-light text-xs text-primary-dark">
        Deadlines wait for no one. Check your tracker daily. 🔥
      </div>
    </aside>
  );
}