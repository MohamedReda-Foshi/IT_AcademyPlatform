
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { type CourseData } from '../../../types/course';

interface CreateCourseFormProps {
  formData: Omit<CourseData, '_id'>;
  errors: Partial<Record<keyof CourseData, string>>;
  onInputChange: (field: keyof CourseData, value: string | number | boolean) => void;
  onArrayChange: (field: keyof CourseData, index: number, value: string) => void;
  onAddArrayItem: (field: keyof CourseData) => void;
  onRemoveArrayItem: (field: keyof CourseData, index: number) => void;
  onSubmit: () => void;
  onReset: () => void;
  isEditing: boolean;
}

const inputBase = "w-full px-3 py-2 bg-black text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600";
const errStyle = "border-red-500";
const okStyle = "border-gray-600";

const ArrayInputField: React.FC<{
  label: string;
  placeholder: string;
  values: string[];
  onChange: (i: number, val: string) => void;
  onAdd: () => void;
  onRemove: (i: number) => void;
}> = ({ label, placeholder, values, onChange, onAdd, onRemove }) => (
  <div className="space-y-2">
    <label className="block text-sm text-gray-200">{label}</label>
    {values.map((value, i) => (
      <div key={i} className="flex gap-2">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(i, e.target.value)}
          className={`${inputBase} ${okStyle}`}
        />
        <button 
          onClick={() => onRemove(i)} 
          className="px-2 text-red-500 hover:text-red-400 transition-colors"
          aria-label="Remove item"
        >
          <Minus size={16} />
        </button>
      </div>
    ))}
    <button 
      onClick={onAdd}
      className="flex items-center px-2 text-green-500 hover:text-green-400 transition-colors"
    >
      <Plus size={16} className="mr-1" /> Add
    </button>
  </div>
);

const page: React.FC<CreateCourseFormProps> = ({
  formData,
  errors,
  onInputChange,
  onArrayChange,
  onAddArrayItem,
  onRemoveArrayItem,
  onSubmit,
  onReset,
  isEditing
}) => (
  <div className="space-y-6">
  
    <Section title="Basic Information">
      <div className="grid md:grid-cols-2 gap-4">
        <InputField 
          label="Name *"
          value={formData.Namecourse}
          error={errors.Namecourse}
          onChange={(v) => onInputChange('Namecourse', v)}
        />
        <InputField 
          label="Category *"
          value={formData.category}
          error={errors.category}
          onChange={(v) => onInputChange('category', v)}
        />
        <SelectField 
          label="Level *"
          value={formData.level}
          options={['Beginner', 'Intermediate', 'Advanced']}
          onChange={(v) => onInputChange('level', v)}
        />
        <SelectField 
          label="Price"
          value={formData.price}
          options={['Free', 'Paid']}
          onChange={(v) => onInputChange('price', v)}
        />
      </div>
      <InputField 
        label="Short Description *"
        value={formData.shortDescription ?? ""}
        error={errors.shortDescription}
        onChange={(v) => onInputChange('shortDescription', v)}
      />
      <TextAreaField 
        label="Full Description *"
        value={formData.DescriptionCourse}
        error={errors.DescriptionCourse}
        onChange={(v) => onInputChange('DescriptionCourse', v)}
        rows={3}
      />
    </Section>

   
    <Section title="Instructor Information">
      <InputField 
        label="Instructor *"
        value={formData.Instructor}
        error={errors.Instructor}
        onChange={(v) => onInputChange('Instructor', v)}
      />
      <TextAreaField 
        label="Bio"
        value={formData.InstructorInformation}
        onChange={(v) => onInputChange('InstructorInformation', v)}
        rows={2}
      />
    </Section>

   
    <Section title="Course Metrics">
      <div className="grid md:grid-cols-4 gap-4">
        <NumberInput 
          label="Duration (minutes) *"
          value={formData.duration ?? 0}
          error={errors.duration}
          onChange={(v) => onInputChange('duration', v)}
        />
        <NumberInput 
          label="Lessons"
          value={formData.totalLessons ?? 0}
          onChange={(v) => onInputChange('totalLessons', v)}
        />
        <NumberInput 
          label="Quizzes"
          value={formData.totalQuizzes ?? 0}
          onChange={(v) => onInputChange('totalQuizzes', v)}
        />
        <NumberInput 
          label="XP"
          value={formData.XpNumber ?? 0}
          onChange={(v) => onInputChange('XpNumber', v)}
        />
        <NumberInput 
          label="Rating"
          value={formData.rating ?? 0}
          step={0.1}
          error={errors.rating}
          onChange={(v) => onInputChange('rating', v)}
        />
        <InputField 
          label="Enrollments"
          value={formData.enrollments ?? 0}
          disabled
        />
        <InputField 
          label="Image URL"
          value={formData.imageUrl ?? ''}
          onChange={(v) => onInputChange('imageUrl', v)}
        />
        <CheckboxField 
          label="Published"
          checked={!!formData.isPublished}
          onChange={(v) => onInputChange('isPublished', v)}
        />
      </div>
    </Section>

   
    <Section title="Course Content">
      <div className="grid md:grid-cols-2 gap-4">
        <ArrayInputField 
          label="Prerequisites"
          placeholder="e.g. JavaScript basics"
          values={formData.prerequisites ?? []}
          onChange={(i, v) => onArrayChange('prerequisites', i, v)}
          onAdd={() => onAddArrayItem('prerequisites')}
          onRemove={(i) => onRemoveArrayItem('prerequisites', i)}
        />
        <ArrayInputField 
          label="Learning Outcomes"
          placeholder="e.g. Build responsive UI"
          values={formData.learningOutcomes ?? []}
          onChange={(i, v) => onArrayChange('learningOutcomes', i, v)}
          onAdd={() => onAddArrayItem('learningOutcomes')}
          onRemove={(i) => onRemoveArrayItem('learningOutcomes', i)}
        />
        <ArrayInputField 
          label="Module IDs"
          placeholder="Module ID"
          values={formData.modules ?? []}
          onChange={(i, v) => onArrayChange('modules', i, v)}
          onAdd={() => onAddArrayItem('modules')}
          onRemove={(i) => onRemoveArrayItem('modules', i)}
        />
        <ArrayInputField 
          label="Video URLs"
          placeholder=""
          values={formData.videoUrl ?? []}
          onChange={(i, v) => onArrayChange('videoUrl', i, v)}
          onAdd={() => onAddArrayItem('videoUrl')}
          onRemove={(i) => onRemoveArrayItem('videoUrl', i)}
        />
        <ArrayInputField 
          label="Text Blocks"
          placeholder="Text content"
          values={formData.text ?? []}
          onChange={(i, v) => onArrayChange('text', i, v)}
          onAdd={() => onAddArrayItem('text')}
          onRemove={(i) => onRemoveArrayItem('text', i)}
        />
        <ArrayInputField 
          label="Quiz IDs"
          placeholder="Quiz ID"
          values={formData.quize ?? []}
          onChange={(i, v) => onArrayChange('quize', i, v)}
          onAdd={() => onAddArrayItem('quize')}
          onRemove={(i) => onRemoveArrayItem('quize', i)}
        />
      </div>
    </Section>

  
    <div className="flex justify-end gap-4">
      <button
        onClick={onReset}
        className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
      >
        Reset Form
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
      >
        {isEditing ? 'Update Course' : 'Create Course'}
      </button>
    </div>
  </div>
);

// Helper components
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-black border border-red-600 p-4 rounded">
    <h2 className="text-xl font-semibold text-red-500 mb-4">{title}</h2>
    {children}
  </div>
);

const InputField: React.FC<{
  label: string;
  value: string | number;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}> = ({ label, value, error, disabled = false, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`${inputBase} ${error ? errStyle : okStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  value: string;
  error?: string;
  rows?: number;
  onChange: (value: string) => void;
}> = ({ label, value, error, rows = 3, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={`${inputBase} ${error ? errStyle : okStyle}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const NumberInput: React.FC<{
  label: string;
  value: number;
  error?: string;
  step?: number;
  onChange: (value: number) => void;
}> = ({ label, value, error, step = 1, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`${inputBase} ${error ? errStyle : okStyle}`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-gray-200 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} ${okStyle}`}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const CheckboxField: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <div className="flex items-center mt-6">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
    />
    <label className="text-gray-200">{label}</label>
  </div>
);

export default page;

