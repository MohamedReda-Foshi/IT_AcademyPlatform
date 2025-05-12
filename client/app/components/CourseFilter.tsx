import React, { useState, useEffect } from 'react';
import Button from './Button';

// Define CourseData and Filters interfaces or import them from your types file
export interface CourseData {
  _id: string;
  Namecourse: string;
  DescriptionCourse: string;
  shortDescription?: string;
  category: string;
  level: string;
  duration: number;
  XpNumber?: number;
  rating: number;
  imageUrl: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
  totalLessons?: number;
  totalQuizzes?: number;
  enrollments?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Filters {
  search: string;
  category: string;
  level: string;
}

interface CourseFilterProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: Partial<Filters>) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ categories, levels, onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const f: Partial<Filters> = {};
    if (search) f.search = search;
    if (category) f.category = category;
    if (level) f.level = level;
    onFilterChange(f);
  }, [search, category, level, onFilterChange]);

  return (
    <div className="p-4  rounded-lg shadow-md  flex flex-col gap-4 items-end">
      {/* Search */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">🔍 Search</label>
        <input
          type="text"
          className="w-full border  rounded px-3 py-2 focus:outline-none focus:ring-2 text-black "
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">📂 Category</label>
        <select
          className="border  rounded px-3 py-2 focus:outline-none focus:ring-2 text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Level */}
      <div>
        <label className="block text-sm font-medium mb-1">🏷️ Level</label>
        <select
          className="border  rounded px-3 py-2 focus:outline-none focus:ring-2 text-black "
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">All</option>
          {levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
            setSearch('');
            setCategory('');
            setLevel('');
        }}
      >
        <Button button="Reset"/>
        
        
        
      </button>
    </div>
  );
};

export default CourseFilter;
