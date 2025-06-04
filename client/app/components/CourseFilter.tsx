// import React from 'react';
// // import Button from './Button';

// // Define CourseData and Filters interfaces
// export interface CourseData {
//   _id: string;
//   Namecourse: string;
//   DescriptionCourse: string;
//   shortDescription?: string;
//   category: string;
//   level: string;
//   duration: number;
//   XpNumber?: number;
//   rating: number;
//   imageUrl: string;
//   prerequisites?: string[];
//   learningOutcomes?: string[];
//   totalLessons?: number;
//   totalQuizzes?: number;
//   enrollments?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface Filters {
//   search: string;
//   category: string;
//   level: string;
// }

// interface CourseFilterProps {
//   categories: string[];
//   levels: string[];
//   // Add initial values for SSR
//   initialSearch?: string;
//   initialCategory?: string;
//   initialLevel?: string;
// }

// const CourseFilter: React.FC<CourseFilterProps> = ({ 
//   categories, 
//   levels, 
//   initialSearch = '',
//   initialCategory = '',
//   initialLevel = ''
// }) => {
//   const handleFilterChange = (type: keyof Filters, value: string) => {
//     // Filter logic can be handled here or removed entirely
//     // depending on your specific needs
//     console.log(`Filter changed: ${type} = ${value}`);
//   };

//   // const handleReset = () => {
//   //   // Reset form elements
//   //   const searchInput = document.querySelector<HTMLInputElement>('input[name="search"]');
//   //   const categorySelect = document.querySelector<HTMLSelectElement>('select[name="category"]');
//   //   const levelSelect = document.querySelector<HTMLSelectElement>('select[name="level"]');
    
//   //   if (searchInput) searchInput.value = '';
//   //   if (categorySelect) categorySelect.value = '';
//   //   if (levelSelect) levelSelect.value = '';
//   // };

//   return (
//     <form className="p-4 rounded-lg shadow-md flex flex-col gap-4 items-end">
//       {/* Search */}
//       {/* <div className="flex-1">
//         <label className="block text-sm font-medium mb-1">🔍 Search</label>
//         <input
//           type="text"
//           name="search"
//           className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 text-black"
//           placeholder="Search courses..."
//           defaultValue={initialSearch}
//           onChange={(e) => handleFilterChange('search', e.target.value)}
//         />
//       </div> */}

//       {/* Category */}
//       <div>
//         <label className="block text-sm font-medium mb-1">📂 Category</label>
//         <select
//           name="category"
//           className="border rounded px-3 py-2 focus:outline-none focus:ring-2 text-black"
//           defaultValue={initialCategory}
//           onChange={(e) => handleFilterChange('category', e.target.value)}
//         >
//           <option value="">All</option>
//           {categories.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>
//       </div>

//       {/* Level */}
//       <div>
//         <label className="block text-sm font-medium mb-1">🏷️ Level</label>
//         <select
//           name="level"
//           className="border rounded px-3 py-2 focus:outline-none focus:ring-2 text-black"
//           defaultValue={initialLevel}
//           onChange={(e) => handleFilterChange('level', e.target.value)}
//         >
//           <option value="">All</option>
//           {levels.map((l) => (
//             <option key={l} value={l}>{l}</option>
//           ))}
//         </select>
//       </div>

//       {/* <button type="button" onClick={handleReset}>
//         <Button button="Reset"/>
//       </button> */}
//     </form>
//   );
// };

// export default CourseFilter;