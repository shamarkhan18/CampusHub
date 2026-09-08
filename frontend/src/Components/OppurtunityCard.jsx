import React from 'react';

const categoryColors = {
  Internship: 'bg-primary-light text-primary',
  Hackathon: 'bg-coral/15 text-coral',
  Scholarship: 'bg-mint/15 text-mint',
  Fellowship: 'bg-amber/15 text-amber',
  Competition: 'bg-primary-light text-primary',
  Other: 'bg-line text-muted',
};

export default function OpportunityCard({ opportunity, onTrack, tracked }) {
  const daysLeft = Math.ceil((new Date(opportunity.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-5 rounded-xl2 bg-card border border-line hover:shadow-soft transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            categoryColors[opportunity.category] || categoryColors.Other
          }`}
        >
          {opportunity.category}
        </span>
        <span className="text-[11px] text-muted whitespace-nowrap">
          {daysLeft >= 0 ? `${daysLeft}d left` : 'Closed'}
        </span>
      </div>

      <div>
        <h3 className="font-semibold text-sm leading-snug">{opportunity.title}</h3>
        <p className="text-xs text-muted mt-0.5">{opportunity.organization}</p>
      </div>

      {opportunity.description && (
        <p className="text-xs text-muted line-clamp-2">{opportunity.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-line">
        <span className="text-[11px] text-muted">📍 {opportunity.location || 'Remote'}</span>
        <button
          onClick={() => onTrack(opportunity)}
          disabled={tracked}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
            tracked
              ? 'bg-line text-muted cursor-default'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {tracked ? 'Tracking ✓' : 'Add to Tracker'}
        </button>
      </div>
    </div>
  );
}