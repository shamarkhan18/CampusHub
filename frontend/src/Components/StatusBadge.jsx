import React from 'react';

const styles = {
  Saved: 'bg-line text-muted',
  'In Progress': 'bg-amber/15 text-amber',
  Applied: 'bg-primary-light text-primary',
  Shortlisted: 'bg-mint/15 text-mint',
  Accepted: 'bg-mint/15 text-mint',
  Rejected: 'bg-coral/15 text-coral',
};

export default function StatusBadge({ status }) {
  const style = styles[status] || 'bg-line text-muted';

  return (
    <span
      className={
        'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ' +
        style
      }
    >
      {status}
    </span>
  );
}