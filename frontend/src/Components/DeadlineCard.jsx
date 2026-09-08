import React from 'react';

function urgency(deadline) {
  const days = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  if (days <= 3) {
    return {
      label: Math.max(days, 0) + 'd left',
      dot: 'bg-coral',
      text: 'text-coral'
    };
  }

  if (days <= 10) {
    return {
      label: days + 'd left',
      dot: 'bg-amber',
      text: 'text-amber'
    };
  }

  return {
    label: days + 'd left',
    dot: 'bg-mint',
    text: 'text-mint'
  };
}

export default function DeadlineCard({ opportunity }) {
  const u = urgency(opportunity.deadline);

  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl2 bg-card border border-line hover:shadow-card transition-shadow">
      <span
        className={
          'w-2.5 h-2.5 rounded-full ' +
          u.dot +
          ' shrink-0'
        }
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">
          {opportunity.title}
        </p>

        <p className="text-xs text-muted truncate">
          {opportunity.organization}
        </p>
      </div>

      <span
        className={
          'text-xs font-semibold whitespace-nowrap ' +
          u.text
        }
      >
        {u.label}
      </span>
    </div>
  );
}