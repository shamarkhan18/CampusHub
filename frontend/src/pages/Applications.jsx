import React, { useEffect, useState } from 'react';
import AppLayout from '../Components/AppLayout.jsx';
import TopHeader from '../Components/TopHeader.jsx';
import StatusBadge from '../Components/StatusBadge.jsx';
import api from '../services/api';

const statuses = ['Saved', 'In Progress', 'Applied', 'Shortlisted', 'Accepted', 'Rejected'];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/applications')
      .then((res) => setApplications(res.data.applications))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    const res = await api.patch(`/applications/${id}`, { status });
    setApplications((prev) => prev.map((a) => (a._id === id ? res.data.application : a)));
  }

  async function removeApplication(id) {
    await api.delete(`/applications/${id}`);
    setApplications((prev) => prev.filter((a) => a._id !== id));
  }

  const summary = statuses.map((s) => ({
    status: s,
    count: applications.filter((a) => a.status === s).length,
  }));
  const maxCount = Math.max(1, ...summary.map((s) => s.count));

  return (
    <AppLayout>
      <TopHeader title="Application Tracker" subtitle="Every opportunity you're chasing, in one list." />

      <div className="bg-card border border-line rounded-xl2 p-5 mb-6">
        <h2 className="text-sm font-semibold mb-4">Applications: {applications.length}</h2>
        <div className="flex flex-col gap-2.5">
          {summary.map((s) => (
            <div key={s.status} className="flex items-center gap-3">
              <span className="text-xs text-muted w-24 shrink-0">{s.status}</span>
              <div className="flex-1 h-2 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(s.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold w-5 text-right">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : applications.length === 0 ? (
        <p className="text-sm text-muted">
          Nothing tracked yet. Head to Opportunities and add something you're eyeing.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((a) => (
            <div
              key={a._id}
              className="p-4 rounded-xl2 bg-card border border-line flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.opportunityId?.title}</p>
                <p className="text-xs text-muted truncate">{a.opportunityId?.organization}</p>
              </div>

              <StatusBadge status={a.status} />

              <select
                value={a.status}
                onChange={(e) => updateStatus(a._id, e.target.value)}
                className="text-xs border border-line rounded-lg px-2 py-1.5 bg-surface outline-none focus:border-primary"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeApplication(a._id)}
                className="text-xs font-semibold text-coral hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}