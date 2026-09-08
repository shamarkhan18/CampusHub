import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Home', icon: 'H' },
  { to: '/opportunities', label: 'Explore', icon: 'E' },
  { to: '/applications', label: 'Tracker', icon: 'T' },
  { to: '/calendar', label: 'Calendar', icon: 'C' },
  { to: '/profile', label: 'Profile', icon: 'P' },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-line px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
                isActive ? 'text-primary' : 'text-muted'
              }`
            }
          >
            <span className="text-lg leading-none">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}