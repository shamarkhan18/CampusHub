import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-surface px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary text-white grid place-items-center font-display font-bold">
            C
          </div>
          <span className="font-display font-semibold text-xl">CampusHub</span>
        </div>

        <div className="bg-card border border-line rounded-xl2 shadow-soft p-6">
          <h1 className="text-lg font-semibold mb-1">Create your account</h1>
          <p className="text-sm text-muted mb-6">Track every deadline in one place.</p>

          {error && (
            <div className="mb-4 text-xs font-medium text-coral bg-coral/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-muted">Full name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm focus:border-primary outline-none"
                placeholder="Shamar Reyes"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm focus:border-primary outline-none"
                placeholder="you@college.edu"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted">College</label>
              <input
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm focus:border-primary outline-none"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm focus:border-primary outline-none"
                placeholder="At least 6 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary text-white text-sm font-semibold rounded-xl py-2.5 hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}