import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-surface px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary text-white grid place-items-center font-display font-bold">
            C
          </div>
          <span className="font-display font-semibold text-xl">CampusHub</span>
        </div>

        <div className="bg-card border border-line rounded-xl2 shadow-soft p-6">
          <h1 className="text-lg font-semibold mb-1">Welcome back</h1>
          <p className="text-sm text-muted mb-6">Log in to see what's due next.</p>

          {error && (
            <div className="mb-4 text-xs font-medium text-coral bg-coral/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <label className="text-xs font-medium text-muted">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-xl border border-line px-3 py-2.5 text-sm focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary text-white text-sm font-semibold rounded-xl py-2.5 hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          New to CampusHub?{' '}
          <Link to="/register" className="text-primary font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}