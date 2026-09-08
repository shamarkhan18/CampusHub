import React from 'react';
import Sidebar from './Sidebar.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <main className="flex-1 px-4 py-6 md:px-10 md:py-8 pb-24 md:pb-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}