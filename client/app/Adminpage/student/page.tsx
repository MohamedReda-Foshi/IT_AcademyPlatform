"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, AlertCircle, RefreshCw, Search } from 'lucide-react';

interface UserData {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export default function StudentsPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/getuser`,
        { credentials: 'include' }
      );
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const data: UserData[] = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/dashboard/deleuser`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        }
      );
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setUsers(prev => prev.filter(u => u._id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-900/50 text-red-400',
      instrator: 'bg-purple-900/50 text-purple-400',
      user: 'bg-blue-900/50 text-blue-400',
    };
    return colors[role] || 'bg-gray-800 text-gray-400';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-500">Students</h1>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-700 rounded p-4 mb-6">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="relative mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading users...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-800 rounded-lg">
          <p className="text-lg">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-gray-400 uppercase text-xs">
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(user => (
                <tr key={user._id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">
                    {user.name} {user.lastName}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {deleteId === user._id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-gray-400">Confirm?</span>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteId(null)}
                          className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteId(user._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
