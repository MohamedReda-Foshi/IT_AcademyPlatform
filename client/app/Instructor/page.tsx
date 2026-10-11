"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { fetchMyCourses, deleteCourse } from '../lib/api/coures';

interface MyCourse {
  _id: string;
  Namecourse: string;
  category: string;
  level: string;
  duration: number;
  price: "Free" | "Paid";
  isPublished: boolean;
  createdAt?: string;
  Instructor?: string;
}

export default function InstructorDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<MyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyCourses();
      setCourses(data as MyCourse[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteCourse(deleteId);
      setCourses(prev => prev.filter(c => c._id !== deleteId));
      setMsg({ type: 'success', text: 'Course deleted' });
    } catch (err) {
      setMsg({ type: 'error', text: err instanceof Error ? err.message : 'Delete failed' });
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-black min-h-screen py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-500">My Courses</h1>
        <button onClick={() => router.push('/Instructor/CreateCourse')}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
          <Plus size={18} /> New Course
        </button>
      </div>

      {msg && (
        <div className={`mb-6 p-4 rounded flex items-center gap-2 ${msg.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'}`}>
          {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {msg.text}
        </div>
      )}

      {loading && <p className="text-center text-gray-400 py-16">Loading...</p>}

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-700 rounded p-4">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-800 rounded-lg">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No courses yet</p>
          <button onClick={() => router.push('/Instructor/CreateCourse')}
            className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
            Create Your First Course
          </button>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid gap-4">
          {courses.map(course => (
            <div key={course._id}
              className="bg-black border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">{course.Namecourse}</h2>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">{course.category}</span>
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">{course.level}</span>
                    <span className="px-2 py-1 bg-gray-800 rounded text-gray-300">{course.duration}min</span>
                    <span className={`px-2 py-1 rounded ${course.price === 'Free' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                      {course.price}
                    </span>
                    <span className={`px-2 py-1 rounded ${course.isPublished ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => router.push(`/Instructor/Courses/${course._id}/edit`)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded transition-colors"
                    title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => setDeleteId(course._id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
                    title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Course</h3>
            <p className="text-gray-400 mb-6">Are you sure? This cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} disabled={deleting}
                className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-50">
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
