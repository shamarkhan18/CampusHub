import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../Components/AppLayout.jsx';
import TopHeader from '../Components/TopHeader.jsx';
import DeadlineCard from '../Components/DeadlineCard.jsx';
import api from '../services/api';

const quickActions = [
  { to: '/opportunities', label: 'Find opportunities', icon: '✺', color: 'bg-primary-light text-primary' },
  { to: '/applications', label: 'View tracker', icon: '☑', color: 'bg-mint/15 text-mint' },
  { to: '/calendar', label: 'Check calendar', icon: '▤', color: 'bg-amber/15 text-amber' },
  { to: '/profile', label: 'Edit profile', icon: '◍', color: 'bg-coral/15 text-coral' },
];

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/applications')
      .then((res) => setApplications(res.data.applications))
      .finally(() => setLoading(false));
  }, []);

  const upcoming = applications
    .filter((a) => a.opportunityId && new Date(a.opportunityId.deadline) > new Date())
    .sort((a, b) => new Date(a.opportunityId.deadline) - new Date(b.opportunityId.deadline))
    .slice(0, 5);

  const counts = applications.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { label: 'Total tracked', value: applications.length, color: 'text-ink' },
    { label: 'Applied', value: counts['Applied'] || 0, color: 'text-primary' },
    { label: 'Shortlisted', value: counts['Shortlisted'] || 0, color: 'text-mint' },
    { label: 'In progress', value: counts['In Progress'] || 0, color: 'text-amber' },
  ];

  return (
    <AppLayout>
      <TopHeader title="Dashboard" subtitle="Here's what's on your plate." />

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {quickActions.map((qa) => (
          <Link
            key={qa.to}
            to={qa.to}
            className="flex flex-col items-start gap-3 p-4 rounded-xl2 bg-card border border-line hover:shadow-soft transition-shadow"
          >
            <span className={`w-9 h-9 rounded-xl grid place-items-center text-base ${qa.color}`}>
              {qa.icon}
            </span>
            <span className="text-sm font-medium">{qa.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="p-4 rounded-xl2 bg-card border border-line">
            <p className={`text-2xl font-display font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming deadlines */}
      <div className="bg-card border border-line rounded-xl2 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Upcoming deadlines</h2>
          <Link to="/applications" className="text-xs font-semibold text-primary">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : upcoming.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted mb-3">Nothing tracked yet.</p>
            <Link to="/opportunities" className="text-sm font-semibold text-primary">
              Browse opportunities →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {upcoming.map((a) => (
              <DeadlineCard key={a._id} opportunity={a.opportunityId} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}