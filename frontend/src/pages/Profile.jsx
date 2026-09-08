import React, { useEffect, useState } from 'react';
import AppLayout from '../Components/AppLayout.jsx';
import TopHeader from '../Components/TopHeader.jsx';
import api from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    graduationYear: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api
      .get('/users/profile')
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.error('Failed to load profile:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await api.patch('/users/me', profile);
      
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <TopHeader
          title="Profile"
          subtitle="Manage your CampusHub profile."
        />
        <p className="text-sm text-muted">Loading profile...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <TopHeader
        title="Profile"
        subtitle="Manage your CampusHub profile."
      />

      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-line rounded-xl2 p-6"
        >
          <div className="mb-6">
            <h2 className="text-base font-semibold">
              Personal information
            </h2>
            <p className="text-sm text-muted mt-1">
              Keep your student information up to date.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>

              <input
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>

              <input
                name="email"
                value={profile.email || ''}
                disabled
                className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface text-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                College
              </label>

              <input
                name="college"
                value={profile.college || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Branch
              </label>

              <input
                name="branch"
                value={profile.branch || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Graduation year
              </label>

              <input
                name="graduationYear"
                type="number"
                value={profile.graduationYear || ''}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Bio
            </label>

            <textarea
              name="bio"
              rows="4"
              value={profile.bio || ''}
              onChange={handleChange}
              placeholder="Tell us a little about yourself..."
              className="w-full px-3 py-2.5 rounded-xl border border-line bg-surface outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            {message && (
              <p className="text-sm text-muted">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="ml-auto px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}