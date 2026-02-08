/*
"use client"
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Edit, Trash2, Search } from 'lucide-react';
import CreateCourseForm from './CreateCourseForm';
import ManageCourses from './ManageCourses';
import { Course } from '../../types/course';

const API_BASE = 'http://localhost:8000/course';

const Page: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState<Omit<Course, '_id'>>(emptyCourse);
  const [errors, setErrors] = useState<Partial<Record<keyof Course, string>>>({});
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE}/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleInput = (field: keyof Course, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: keyof Course, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: keyof Course) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
      updatedAt: new Date().toISOString()
    }));
  };

  const removeArrayItem = (field: keyof Course, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
      updatedAt: new Date().toISOString()
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Course, string>> = {};
    if (!formData.Namecourse.trim()) newErrors.Namecourse = 'Required';
    if (!formData.DescriptionCourse.trim()) newErrors.DescriptionCourse = 'Required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Required';
    if (!formData.category.trim()) newErrors.category = 'Required';
    if (!formData.Instructor.trim()) newErrors.Instructor = 'Required';
    if (formData.duration <= 0) newErrors.duration = 'Must be > 0';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = '0–5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload: Omit<Course, '_id'> = {
      ...formData,
      modules: formData.modules.filter((s: string) => s.trim()),
      prerequisites: formData.prerequisites.filter((s: string) => s.trim()),
      learningOutcomes: formData.learningOutcomes.filter((s: string) => s.trim()),
      videoUrl: formData.videoUrl.filter((s: string) => s.trim()),
      text: formData.text.filter((s: string) => s.trim()),
      quize: formData.quize.filter((s: string) => s.trim()),
    };

    try {
      if (editingCourse) {
        const response = await fetch(`${API_BASE}/courses/${editingCourse._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        const updated = await response.json();
        setCourses(courses.map(c => c._id === updated._id ? updated : c));
        alert('Course updated successfully!');
      } else {
        const response = await fetch(`${API_BASE}/courses`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
        alert('Course created successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Operation failed:', error);
      alert('Operation failed. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData(emptyCourse);
    setEditingCourse(null);
    setErrors({});
  };

  const handleEdit = (course: Course) => {
    setFormData(course);
    setEditingCourse(course);
    setActiveTab('create');
  };

  const handleDelete = async (course: Course) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await fetch(`${API_BASE}/courses/${course._id}`, { method: 'DELETE' });
      setCourses(courses.filter(c => c._id !== course._id));
      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete operation failed. Please try again.');
    }
  };

  const handleTogglePublish = async (course: Course) => {
    try {
      const response = await fetch(`${API_BASE}/courses/${course._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ...course, isPublished: !course.isPublished })
      });
      const updated = await response.json();
      setCourses(courses.map(c => c._id === updated._id ? updated : c));
    } catch (error) {
      console.error('Publish toggle failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen py-12">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Course Manager</h1>
      
      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'create' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {editingCourse ? 'Edit Course' : 'Create Course'}
        </button>
        <button 
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'manage' ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {`Manage Courses (${courses.length})`}
        </button>
      </div>

      {activeTab === 'create' ? (
        <CreateCourseForm
          formData={formData}
          errors={errors}
          onInputChange={handleInput}
          onArrayChange={handleArrayChange}
          onAddArrayItem={addArrayItem}
          onRemoveArrayItem={removeArrayItem}
          onSubmit={handleSubmit}
          onReset={resetForm}
          isEditing={!!editingCourse}
        />
      ) : (
        <ManageCourses
          courses={courses}
          searchTerm={searchTerm}
          filterLevel={filterLevel}
          filterCategory={filterCategory}
          onSearchChange={setSearchTerm}
          onFilterLevelChange={setFilterLevel}
          onFilterCategoryChange={setFilterCategory}
          onEditCourse={handleEdit}
          onDeleteCourse={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      )}
    </div>
  );
};

export default Page;

*/