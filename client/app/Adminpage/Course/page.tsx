"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus, Trash2, Edit3, AlertCircle, RefreshCw, Search, Check, X,
  ChevronDown, ChevronRight, BookOpen, ListOrdered
} from 'lucide-react';

interface CourseItem {
  _id: string;
  Namecourse: string;
  category: string;
  level: string;
  duration: number;
  price: string;
  isPublished?: boolean;
  imageUrl?: string;
  shortDescription?: string;
  Instructor?: string;
}

interface ChapterItem {
  _id: string;
  ChapterTitle: string;
  order: number;
  videoTitle?: string;
  videoUrl?: string;
  textTitle?: string;
  text?: string[];
  quize?: string;
  filename?: string;
  filedata?: string;
  courseId: string;
}

interface ChapterForm {
  ChapterTitle: string;
  order: number;
  videoTitle: string;
  videoUrl: string;
  textTitle: string;
  text: string;
  quize: string;
  filename: string;
  filedata: string;
}

const emptyChapterForm: ChapterForm = {
  ChapterTitle: '', order: 0, videoTitle: '', videoUrl: '',
  textTitle: '', text: '', quize: '', filename: '', filedata: ''
};

export default function CourseManagerPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CourseItem>>({});

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Record<string, ChapterItem[]>>({});
  const [chaptersLoading, setChaptersLoading] = useState<Record<string, boolean>>({});
  const [chapterError, setChapterError] = useState<string | null>(null);

  const [showAddChapter, setShowAddChapter] = useState(false);
  const [chapterForm, setChapterForm] = useState<ChapterForm>(emptyChapterForm);
  const [editChapterId, setEditChapterId] = useState<string | null>(null);
  const [editChapterForm, setEditChapterForm] = useState<Partial<ChapterItem>>({});
  const [deleteChapterId, setDeleteChapterId] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/CourseCard`,
        { credentials: 'include' }
      );
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const data: CourseItem[] = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const fetchChapters = async (courseId: string) => {
    setChaptersLoading(p => ({ ...p, [courseId]: true }));
    setChapterError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/getChapter/${courseId}`,
        { credentials: 'include' }
      );
      if (!res.ok) throw new Error(`Failed to fetch chapters (${res.status})`);
      const data: ChapterItem[] = await res.json();
      setChapters(p => ({ ...p, [courseId]: data }));
    } catch (err) {
      setChapterError(err instanceof Error ? err.message : 'Failed to load chapters');
      setChapters(p => ({ ...p, [courseId]: [] }));
    } finally {
      setChaptersLoading(p => ({ ...p, [courseId]: false }));
    }
  };

  const toggleExpand = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setShowAddChapter(false);
      setChapterForm(emptyChapterForm);
    } else {
      setExpandedCourse(courseId);
      setShowAddChapter(false);
      setChapterForm(emptyChapterForm);
      if (!chapters[courseId]) fetchChapters(courseId);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/DeleteCourse/${id}`,
        { method: 'DELETE', credentials: 'include' }
      );
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setCourses(prev => prev.filter(c => c._id !== id));
      setDeleteId(null);
      if (expandedCourse === id) setExpandedCourse(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const startEdit = (course: CourseItem) => {
    setEditingId(course._id);
    setEditForm({
      Namecourse: course.Namecourse,
      category: course.category,
      level: course.level,
      duration: course.duration,
      price: course.price,
      isPublished: course.isPublished,
      shortDescription: course.shortDescription,
      Instructor: course.Instructor,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/UpdateCourse/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editForm),
        }
      );
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      const updated: CourseItem = await res.json();
      setCourses(prev => prev.map(c => c._id === id ? { ...c, ...updated } : c));
      setEditingId(null);
      setEditForm({});
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleAddChapter = async () => {
    if (!chapterForm.ChapterTitle.trim()) { alert('Chapter title is required'); return; }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/addChapter`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...chapterForm, courseId: expandedCourse }),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Add failed (${res.status})`);
      }
      setChapterForm(emptyChapterForm);
      setShowAddChapter(false);
      if (expandedCourse) fetchChapters(expandedCourse);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Add chapter failed');
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/deleteChapter/${chapterId}`,
        { method: 'DELETE', credentials: 'include' }
      );
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      setDeleteChapterId(null);
      if (expandedCourse) {
        setChapters(p => ({
          ...p,
          [expandedCourse]: (p[expandedCourse] || []).filter(ch => ch._id !== chapterId)
        }));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete chapter failed');
    }
  };

  const startEditChapter = (chapter: ChapterItem) => {
    setEditChapterId(chapter._id);
    setEditChapterForm({ ...chapter });
  };

  const cancelEditChapter = () => {
    setEditChapterId(null);
    setEditChapterForm({});
  };

  const handleUpdateChapter = async (chapterId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/chapter/updateChapter/${chapterId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editChapterForm),
        }
      );
      if (!res.ok) throw new Error(`Update failed (${res.status})`);
      const updated: ChapterItem = await res.json();
      setEditChapterId(null);
      setEditChapterForm({});
      if (expandedCourse) {
        setChapters(p => ({
          ...p,
          [expandedCourse]: (p[expandedCourse] || []).map(ch => ch._id === chapterId ? { ...ch, ...updated } : ch)
        }));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update chapter failed');
    }
  };

  const filtered = courses.filter(c =>
    c.Namecourse.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-red-500">Course Manager</h1>
        <div className="flex gap-3">
          <button
            onClick={fetchCourses}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <Link
            href="/Adminpage/Course/CreateCourse"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            <Plus size={16} /> Create Course
          </Link>
        </div>
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
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">Loading courses...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20 border border-dashed border-gray-800 rounded-lg">
          <p className="text-lg">No courses found</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-gray-400 uppercase text-xs">
                <th className="px-2 py-4 w-10"></th>
                <th className="text-left px-4 py-4">Name</th>
                <th className="text-left px-4 py-4">Category</th>
                <th className="text-left px-4 py-4">Level</th>
                <th className="text-left px-4 py-4">Duration</th>
                <th className="text-left px-4 py-4">Price</th>
                <th className="text-center px-4 py-4">Status</th>
                <th className="text-right px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(course => (
                <React.Fragment key={course._id}>
                  <tr className="hover:bg-gray-900/50 transition-colors">
                    {editingId === course._id ? (
                      <>
                        <td className="px-2 py-4"></td>
                        <td className="px-4 py-4">
                          <input type="text" value={editForm.Namecourse || ''}
                            onChange={(e) => setEditForm(f => ({ ...f, Namecourse: e.target.value }))}
                            className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                        </td>
                        <td className="px-4 py-4">
                          <input type="text" value={editForm.category || ''}
                            onChange={(e) => setEditForm(f => ({ ...f, category: e.target.value }))}
                            className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                        </td>
                        <td className="px-4 py-4">
                          <select value={editForm.level || 'Beginner'}
                            onChange={(e) => setEditForm(f => ({ ...f, level: e.target.value }))}
                            className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded text-sm">
                            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <input type="number" value={editForm.duration ?? 0}
                            onChange={(e) => setEditForm(f => ({ ...f, duration: Number(e.target.value) }))}
                            className="w-20 px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                        </td>
                        <td className="px-4 py-4">
                          <select value={editForm.price || 'Free'}
                            onChange={(e) => setEditForm(f => ({ ...f, price: e.target.value }))}
                            className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded text-sm">
                            <option>Free</option><option>Paid</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input type="checkbox" checked={!!editForm.isPublished}
                            onChange={(e) => setEditForm(f => ({ ...f, isPublished: e.target.checked }))}
                            className="h-4 w-4 text-red-600 rounded focus:ring-red-500" />
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleUpdate(course._id)}
                              className="p-1.5 text-green-400 hover:bg-green-900/30 rounded" title="Save">
                              <Check size={16} />
                            </button>
                            <button onClick={cancelEdit}
                              className="p-1.5 text-gray-400 hover:bg-gray-700 rounded" title="Cancel">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-4">
                          <button onClick={() => toggleExpand(course._id)}
                            className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                            {expandedCourse === course._id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-white font-medium">{course.Namecourse}</td>
                        <td className="px-4 py-4 text-gray-300">{course.category}</td>
                        <td className="px-4 py-4">
                          <span className="text-xs px-2 py-1 bg-gray-800 rounded">{course.level}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-300">{course.duration}min</td>
                        <td className="px-4 py-4">
                          <span className={`text-xs px-2 py-1 rounded ${course.price === 'Free' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                            {course.price}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs px-2 py-1 rounded ${course.isPublished ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                            {course.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => startEdit(course)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded" title="Edit">
                              <Edit3 size={16} />
                            </button>
                            {deleteId === course._id ? (
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleDelete(course._id)}
                                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">Yes</button>
                                <button onClick={() => setDeleteId(null)}
                                  className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600">No</button>
                              </div>
                            ) : (
                              <button onClick={() => setDeleteId(course._id)}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                  {expandedCourse === course._id && (
                    <tr>
                      <td colSpan={8} className="px-0 py-0">
                        <div className="bg-gray-950/80 border-t border-gray-800 px-6 py-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                              <BookOpen size={18} className="text-red-400" /> Chapters
                            </h3>
                            <button
                              onClick={() => { setShowAddChapter(!showAddChapter); setChapterForm(emptyChapterForm); }}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                              <Plus size={14} /> Add Chapter
                            </button>
                          </div>

                          {showAddChapter && (
                            <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                              <h4 className="text-sm font-medium text-gray-300 mb-3">New Chapter</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <input placeholder="Chapter Title *" value={chapterForm.ChapterTitle}
                                  onChange={(e) => setChapterForm(f => ({ ...f, ChapterTitle: e.target.value }))}
                                  className="col-span-2 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Order" type="number" value={chapterForm.order}
                                  onChange={(e) => setChapterForm(f => ({ ...f, order: Number(e.target.value) }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Video Title" value={chapterForm.videoTitle}
                                  onChange={(e) => setChapterForm(f => ({ ...f, videoTitle: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Video URL" value={chapterForm.videoUrl}
                                  onChange={(e) => setChapterForm(f => ({ ...f, videoUrl: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Text Title" value={chapterForm.textTitle}
                                  onChange={(e) => setChapterForm(f => ({ ...f, textTitle: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Text (comma-separated)" value={chapterForm.text}
                                  onChange={(e) => setChapterForm(f => ({ ...f, text: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Quiz" value={chapterForm.quize}
                                  onChange={(e) => setChapterForm(f => ({ ...f, quize: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Filename" value={chapterForm.filename}
                                  onChange={(e) => setChapterForm(f => ({ ...f, filename: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                                <input placeholder="Filedata" value={chapterForm.filedata}
                                  onChange={(e) => setChapterForm(f => ({ ...f, filedata: e.target.value }))}
                                  className="px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded text-sm" />
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button onClick={handleAddChapter}
                                  className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700">Save Chapter</button>
                                <button onClick={() => { setShowAddChapter(false); setChapterForm(emptyChapterForm); }}
                                  className="px-4 py-1.5 text-sm bg-gray-700 text-gray-300 rounded hover:bg-gray-600">Cancel</button>
                              </div>
                            </div>
                          )}

                          {chaptersLoading[course._id] ? (
                            <p className="text-gray-500 text-sm py-4 text-center">Loading chapters...</p>
                          ) : chapterError && expandedCourse === course._id ? (
                            <p className="text-red-400 text-sm py-4 text-center">{chapterError}</p>
                          ) : !chapters[course._id] || chapters[course._id].length === 0 ? (
                            <p className="text-gray-500 text-sm py-4 text-center border border-dashed border-gray-800 rounded-lg">
                              No chapters yet
                            </p>
                          ) : (
                            <div className="overflow-x-auto rounded border border-gray-800">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="bg-gray-900 text-gray-500 uppercase">
                                    <th className="text-left px-3 py-2 w-12">Order</th>
                                    <th className="text-left px-3 py-2">Title</th>
                                    <th className="text-left px-3 py-2">Video</th>
                                    <th className="text-left px-3 py-2">Text</th>
                                    <th className="text-left px-3 py-2">Quiz</th>
                                    <th className="text-right px-3 py-2 w-24">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                  {(chapters[course._id] || []).map(chapter => (
                                    <tr key={chapter._id} className="hover:bg-gray-900/50 transition-colors">
                                      {editChapterId === chapter._id ? (
                                        <>
                                          <td className="px-3 py-2">
                                            <input type="number" value={editChapterForm.order ?? 0}
                                              onChange={(e) => setEditChapterForm(f => ({ ...f, order: Number(e.target.value) }))}
                                              className="w-14 px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded" />
                                          </td>
                                          <td className="px-3 py-2">
                                            <input type="text" value={editChapterForm.ChapterTitle || ''}
                                              onChange={(e) => setEditChapterForm(f => ({ ...f, ChapterTitle: e.target.value }))}
                                              className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded" />
                                          </td>
                                          <td className="px-3 py-2">
                                            <div className="flex flex-col gap-1">
                                              <input type="text" placeholder="Title" value={editChapterForm.videoTitle || ''}
                                                onChange={(e) => setEditChapterForm(f => ({ ...f, videoTitle: e.target.value }))}
                                                className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded w-full" />
                                              <input type="text" placeholder="URL" value={editChapterForm.videoUrl || ''}
                                                onChange={(e) => setEditChapterForm(f => ({ ...f, videoUrl: e.target.value }))}
                                                className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded w-full" />
                                            </div>
                                          </td>
                                          <td className="px-3 py-2">
                                            <div className="flex flex-col gap-1">
                                              <input type="text" placeholder="Title" value={editChapterForm.textTitle || ''}
                                                onChange={(e) => setEditChapterForm(f => ({ ...f, textTitle: e.target.value }))}
                                                className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded w-full" />
                                              <input type="text" placeholder="Text" value={(editChapterForm.text || []).join(',')}
                                                onChange={(e) => setEditChapterForm(f => ({ ...f, text: e.target.value.split(',') }))}
                                                className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded w-full" />
                                            </div>
                                          </td>
                                          <td className="px-3 py-2">
                                            <input type="text" value={editChapterForm.quize || ''}
                                              onChange={(e) => setEditChapterForm(f => ({ ...f, quize: e.target.value }))}
                                              className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded" />
                                          </td>
                                          <td className="px-3 py-2 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                              <button onClick={() => handleUpdateChapter(chapter._id)}
                                                className="p-1 text-green-400 hover:bg-green-900/30 rounded" title="Save">
                                                <Check size={14} />
                                              </button>
                                              <button onClick={cancelEditChapter}
                                                className="p-1 text-gray-400 hover:bg-gray-700 rounded" title="Cancel">
                                                <X size={14} />
                                              </button>
                                            </div>
                                          </td>
                                        </>
                                      ) : (
                                        <>
                                          <td className="px-3 py-2 text-gray-400">
                                            <span className="flex items-center gap-1">
                                              <ListOrdered size={12} /> {chapter.order}
                                            </span>
                                          </td>
                                          <td className="px-3 py-2 text-white">{chapter.ChapterTitle}</td>
                                          <td className="px-3 py-2 text-gray-400 max-w-[160px] truncate">
                                            {chapter.videoTitle || <span className="text-gray-600">—</span>}
                                          </td>
                                          <td className="px-3 py-2 text-gray-400 max-w-[120px] truncate">
                                            {chapter.textTitle || <span className="text-gray-600">—</span>}
                                          </td>
                                          <td className="px-3 py-2 text-gray-400 max-w-[120px] truncate">
                                            {chapter.quize ? <span className="text-yellow-500">Has quiz</span> : <span className="text-gray-600">—</span>}
                                          </td>
                                          <td className="px-3 py-2 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                              <button onClick={() => startEditChapter(chapter)}
                                                className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded" title="Edit">
                                                <Edit3 size={14} />
                                              </button>
                                              {deleteChapterId === chapter._id ? (
                                                <div className="flex items-center gap-1">
                                                  <button onClick={() => handleDeleteChapter(chapter._id)}
                                                    className="px-2 py-0.5 text-xs bg-red-600 text-white rounded hover:bg-red-700">Yes</button>
                                                  <button onClick={() => setDeleteChapterId(null)}
                                                    className="px-2 py-0.5 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600">No</button>
                                                </div>
                                              ) : (
                                                <button onClick={() => setDeleteChapterId(chapter._id)}
                                                  className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded" title="Delete">
                                                  <Trash2 size={14} />
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                        </>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
