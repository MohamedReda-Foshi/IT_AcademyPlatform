"use client";

import React, { useEffect, useState } from 'react';
import { BookOpen, Mail, User, ChevronDown, ChevronRight, AlertCircle } from 'lucide-react';

interface InstructorUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  about?: string;
  createdAt?: string;
}

interface CourseItem {
  _id: string;
  Namecourse: string;
  category: string;
  level: string;
  duration: number;
  price: "Free" | "Paid";
  Instructor: string;
  InstructorInformation?: string;
  isPublished: boolean;
  createdAt?: string;
}

interface ApiResponse {
  instructors: InstructorUser[];
  courses: CourseItem[];
}

export default function InstructorsPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXPRESS_URL}/instructor/all`,
          { credentials: 'include' }
        );
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load instructors');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-12">
        <div className="text-center text-gray-400 py-20">Loading instructors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-12">
        <div className="flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-700 rounded p-4">
          <AlertCircle size={20} /> {error}
        </div>
      </div>
    );
  }

  const getCoursesForInstructor = (name: string) =>
    data?.courses.filter(c => c.Instructor === name) ?? [];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-20">
      <h1 className="text-3xl font-bold text-red-500 mb-8">Instructors &amp; Their Courses</h1>

      <div className="grid gap-6">
        {data?.instructors.map(instructor => {
          const courses = getCoursesForInstructor(instructor.name);
          const isExpanded = expanded[instructor._id] ?? true;

          return (
            <div key={instructor._id}
              className="bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
              <button
                onClick={() => toggleExpand(instructor._id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                    <User size={24} className="text-red-500" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold text-white">{instructor.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Mail size={14} />{instructor.email}</span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />{courses.length} {courses.length === 1 ? 'course' : 'courses'}
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="border-t border-gray-800">
                  {courses.length === 0 ? (
                    <p className="text-gray-500 text-sm p-5">No courses created yet.</p>
                  ) : (
                    <div className="divide-y divide-gray-800">
                      {courses.map(course => (
                        <div key={course._id} className="p-5 hover:bg-gray-900/30 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-white font-medium">{course.Namecourse}</h3>
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                                <span className="px-2 py-1 bg-gray-800 rounded">{course.category}</span>
                                <span className="px-2 py-1 bg-gray-800 rounded">{course.level}</span>
                                <span className="px-2 py-1 bg-gray-800 rounded">{course.duration}min</span>
                                <span className={`px-2 py-1 rounded ${course.price === 'Free' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                                  {course.price}
                                </span>
                                <span className={`px-2 py-1 rounded ${course.isPublished ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                                  {course.isPublished ? 'Published' : 'Draft'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data?.instructors.length === 0 && (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-800 rounded-lg">
          <User size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No instructors found</p>
          <p className="text-sm mt-1">Users with role &quot;instrator&quot; will appear here.</p>
        </div>
      )}
    </div>
  );
}
