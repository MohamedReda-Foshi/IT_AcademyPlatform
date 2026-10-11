"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import { useSession } from '../../lib/auth-client';
import { createCourse } from '../../lib/api/coures';
import { type Course } from '../../types/course';

const inputBase = "w-full px-3 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600";
const errStyle = "border-red-500";
const okStyle = "border-gray-600";

const defaultFormData: Omit<Course, '_id'> = {
  Namecourse: '',
  DescriptionCourse: '',
  shortDescription: '',
  category: '',
  level: 'Beginner',
  duration: 0,
  XpNumber: 0,
  rating: 0,
  imageUrl: '',
  prerequisites: [],
  learningOutcomes: [],
  totalLessons: 0,
  totalQuizzes: 0,
  enrollments: 0,
  filters: '',
  modules: [],
  price: 'Free',
  createdAt: '',
  updatedAt: '',
  isPublished: false,
  videoUrl: [],
  text: [],
  quize: [],
  InstructorInformation: '',
  Instructor: '',
  o: 0,
  i: 0,
};

const ArrayInputField: React.FC<{
  label: string; placeholder: string; values: string[];
  onChange: (i: number, val: string) => void;
  onAdd: () => void; onRemove: (i: number) => void;
}> = ({ label, placeholder, values, onChange, onAdd, onRemove }) => (
  <div className="space-y-2">
    <label className="block text-sm text-gray-200">{label}</label>
    {values.map((value, i) => (
      <div key={i} className="flex gap-2">
        <input type="text" value={value} placeholder={placeholder}
          onChange={(e) => onChange(i, e.target.value)}
          className={`${inputBase} ${okStyle}`} />
        <button onClick={() => onRemove(i)}
          className="px-2 text-red-500 hover:text-red-400 transition-colors"
          aria-label="Remove item"><Minus size={16} /></button>
      </div>
    ))}
    <button onClick={onAdd}
      className="flex items-center px-2 text-green-500 hover:text-green-400 transition-colors">
      <Plus size={16} className="mr-1" /> Add
    </button>
  </div>
);

export default function CreateCoursePage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<Omit<Course, '_id'>>(defaultFormData);
  type FormField = keyof Omit<Course, '_id'>;
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, Instructor: session.user.name }));
    }
  }, [session]);

  const onInputChange = (field: FormField, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const onArrayChange = (field: FormField, index: number, value: string) => {
    setFormData(prev => {
      const arr = [...(prev[field] as unknown as string[] || [])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const onAddArrayItem = (field: FormField) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as unknown as string[] || []), ''],
    }));
  };

  const onRemoveArrayItem = (field: FormField, index: number) => {
    setFormData(prev => {
      const arr = [...(prev[field] as unknown as string[] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const onReset = () => {
    setFormData({ ...defaultFormData, Instructor: session?.user?.name || '' });
    setErrors({});
    setStatus(null);
  };

  const onSubmit = async () => {
    const newErrors: Partial<Record<FormField, string>> = {};
    if (!formData.Namecourse) newErrors.Namecourse = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.DescriptionCourse) newErrors.DescriptionCourse = 'Description is required';
    if (!formData.shortDescription) newErrors.shortDescription = 'Short description is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setStatus(null);
    try {
      await createCourse(formData as unknown as Record<string, unknown>);
      setStatus({ type: 'success', message: 'Course created successfully!' });
      onReset();
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Failed to create course' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-black min-h-screen py-12">
      <h1 className="text-3xl font-bold text-red-500 mb-8">Create Your Course</h1>

      {status && (
        <div className={`mb-6 p-4 rounded flex items-center gap-2 ${status.type === 'success' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-red-900/50 text-red-400 border border-red-700'}`}>
          {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <div className="space-y-6">
        <Section title="Basic Information">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Course Name *" value={formData.Namecourse} error={errors.Namecourse}
              onChange={(v) => onInputChange('Namecourse', v)} />
            <InputField label="Category *" value={formData.category} error={errors.category}
              onChange={(v) => onInputChange('category', v)} />
            <SelectField label="Level *" value={formData.level}
              options={['Beginner', 'Intermediate', 'Advanced']}
              onChange={(v) => onInputChange('level', v)} />
            <SelectField label="Price" value={formData.price}
              options={['Free', 'Paid']}
              onChange={(v) => onInputChange('price', v)} />
          </div>
          <InputField label="Short Description *" value={formData.shortDescription ?? ""}
            error={errors.shortDescription}
            onChange={(v) => onInputChange('shortDescription', v)} />
          <TextAreaField label="Full Description *" value={formData.DescriptionCourse}
            error={errors.DescriptionCourse}
            onChange={(v) => onInputChange('DescriptionCourse', v)} rows={3} />
        </Section>

        <Section title="Instructor Information">
          <InputField label="Instructor *" value={formData.Instructor}
            error={errors.Instructor}
            onChange={(v) => onInputChange('Instructor', v)} />
          <TextAreaField label="Bio" value={formData.InstructorInformation}
            onChange={(v) => onInputChange('InstructorInformation', v)} rows={2} />
        </Section>

        <Section title="Course Metrics">
          <div className="grid md:grid-cols-4 gap-4">
            <NumberInput label="Duration (min) *" value={formData.duration ?? 0} error={errors.duration}
              onChange={(v) => onInputChange('duration', v)} />
            <NumberInput label="Lessons" value={formData.totalLessons ?? 0}
              onChange={(v) => onInputChange('totalLessons', v)} />
            <NumberInput label="Quizzes" value={formData.totalQuizzes ?? 0}
              onChange={(v) => onInputChange('totalQuizzes', v)} />
            <NumberInput label="XP" value={formData.XpNumber ?? 0}
              onChange={(v) => onInputChange('XpNumber', v)} />
            <NumberInput label="Rating" value={formData.rating ?? 0} step={0.1} error={errors.rating}
              onChange={(v) => onInputChange('rating', v)} />
            <InputField label="Image URL" value={formData.imageUrl ?? ''}
              onChange={(v) => onInputChange('imageUrl', v)} />
            <CheckboxField label="Published" checked={!!formData.isPublished}
              onChange={(v) => onInputChange('isPublished', v)} />
          </div>
        </Section>

        <Section title="Course Content">
          <div className="grid md:grid-cols-2 gap-4">
            <ArrayInputField label="Prerequisites" placeholder="e.g. JavaScript basics"
              values={formData.prerequisites ?? []}
              onChange={(i, v) => onArrayChange('prerequisites', i, v)}
              onAdd={() => onAddArrayItem('prerequisites')}
              onRemove={(i) => onRemoveArrayItem('prerequisites', i)} />
            <ArrayInputField label="Learning Outcomes" placeholder="e.g. Build responsive UI"
              values={formData.learningOutcomes ?? []}
              onChange={(i, v) => onArrayChange('learningOutcomes', i, v)}
              onAdd={() => onAddArrayItem('learningOutcomes')}
              onRemove={(i) => onRemoveArrayItem('learningOutcomes', i)} />
            <ArrayInputField label="Video URLs" placeholder="https://example.com/video"
              values={formData.videoUrl ?? []}
              onChange={(i, v) => onArrayChange('videoUrl', i, v)}
              onAdd={() => onAddArrayItem('videoUrl')}
              onRemove={(i) => onRemoveArrayItem('videoUrl', i)} />
            <ArrayInputField label="Text Blocks" placeholder="Text content"
              values={formData.text ?? []}
              onChange={(i, v) => onArrayChange('text', i, v)}
              onAdd={() => onAddArrayItem('text')}
              onRemove={(i) => onRemoveArrayItem('text', i)} />
          </div>
        </Section>

        <div className="flex justify-end gap-4">
          <button onClick={onReset}
            className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
            Reset
          </button>
          <button onClick={onSubmit} disabled={submitting}
            className="px-6 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors disabled:opacity-50">
            {submitting ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </div>
    </div>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-black border border-red-600 p-4 rounded">
    <h2 className="text-xl font-semibold text-red-500 mb-4">{title}</h2>
    {children}
  </div>
);

const InputField: React.FC<{
  label: string; value: string | number; error?: string; disabled?: boolean;
  onChange?: (value: string) => void;
}> = ({ label, value, error, disabled = false, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <input type="text" value={value} disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${inputBase} ${error ? errStyle : okStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const TextAreaField: React.FC<{
  label: string; value: string; error?: string; rows?: number;
  onChange: (value: string) => void;
}> = ({ label, value, error, rows = 3, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputBase} ${error ? errStyle : okStyle}`} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const NumberInput: React.FC<{
  label: string; value: number; error?: string; step?: number;
  onChange: (value: number) => void;
}> = ({ label, value, error, step = 1, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <input type="number" value={value} step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`${inputBase} ${error ? errStyle : okStyle}`} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string; value: string; options: string[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} ${okStyle}`}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const CheckboxField: React.FC<{
  label: string; checked: boolean; onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div className="flex items-center mt-6">
    <input type="checkbox" checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500" />
    <label className="text-gray-200">{label}</label>
  </div>
);
