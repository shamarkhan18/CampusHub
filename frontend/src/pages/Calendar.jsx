import React from 'react';
import AppLayout from '../Components/AppLayout.jsx';
import TopHeader from '../Components/TopHeader.jsx';

export default function Calendar() {
  return (
    <AppLayout>
      <TopHeader
        title="Calendar"
        subtitle="Keep track of your important dates."
      />

      <div className="bg-card border border-line rounded-xl2 p-6">
        <h2 className="text-lg font-semibold mb-2">
          Your Calendar
        </h2>

        <p className="text-sm text-muted">
          Calendar view coming soon.
        </p>
      </div>
    </AppLayout>
  );
}