import React, { useEffect, useState } from 'react';
import AppLayout from '../Components/AppLayout.jsx';
import TopHeader from '../Components/TopHeader.jsx';
import OpportunityCard from '../Components/OppurtunityCard.jsx';
import api from '../services/api';

const categories = ['All', 'Internship', 'Hackathon', 'Scholarship', 'Fellowship', 'Competition'];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    const params = {};
    if (category !== 'All') params.category = category;
    if (search) params.search = search;
    Promise.all([api.get('/opportunities', { params }), api.get('/applications')])
      .then(([oppRes, appRes]) => {
        setOpportunities(oppRes.data.opportunities);
        setApplications(appRes.data.applications);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    load();
  }

  async function handleTrack(opportunity) {
    try {
      const res = await api.post('/applications', { opportunityId: opportunity._id });
      setApplications((prev) => [...prev, res.data.application]);
    } catch (err) {
      // already tracked or error — silently ignore duplicate case
    }
  }

  const trackedIds = new Set(applications.map((a) => a.opportunityId?._id || a.opportunityId));

  return (
    <AppLayout>
      <TopHeader title="Opportunities" subtitle="Internships, hackathons, scholarships, and more." />

      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or organization…"
          className="flex-1 rounded-xl border border-line bg-card px-4 py-2.5 text-sm focus:border-primary outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              category === c
                ? 'bg-primary text-white border-primary'
                : 'bg-card text-muted border-line hover:border-primary/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading opportunities…</p>
      ) : opportunities.length === 0 ? (
        <p className="text-sm text-muted">No opportunities match that search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp._id}
              opportunity={opp}
              onTrack={handleTrack}
              tracked={trackedIds.has(opp._id)}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}