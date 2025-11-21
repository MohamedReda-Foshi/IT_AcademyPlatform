import React, { FC } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import type { CourseData } from '../types/course';

interface CoursesListProps {
  courses: CourseData[];
}

const CoursesList: FC<CoursesListProps> = ({ courses }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Short Desc.</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Modules</TableHead>
            <TableHead>Prerequisites</TableHead>
            <TableHead>Learning Outcomes</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Published?</TableHead>
            <TableHead>Total Lessons</TableHead>
            <TableHead>Total Quizzes</TableHead>
            <TableHead>Enrollments</TableHead>
            <TableHead>XP</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Instructor Info</TableHead>
            <TableHead>Videos</TableHead>
            <TableHead>Texts</TableHead>
            <TableHead>Quizzes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.Namecourse}>
              <TableCell>{course.Namecourse}</TableCell>
              <TableCell className="max-w-xs truncate">{course.DescriptionCourse}</TableCell>
              <TableCell>{course.shortDescription}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>{course.level}</TableCell>
              <TableCell>{course.imageUrl}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.duration} min</TableCell>
              <TableCell>{course.modules.length}</TableCell>
              <TableCell>{course.rating}</TableCell>
              <TableCell>{course.isPublished ? '✔️' : '❌'}</TableCell>
              <TableCell>{course.totalLessons}</TableCell>
              <TableCell>{course.totalQuizzes}</TableCell>
              <TableCell>{course.enrollments}</TableCell>
              <TableCell>{course.XpNumber}</TableCell>
              <TableCell>{course.Instructor}</TableCell>
              <TableCell className="max-w-xs truncate">{course.InstructorInformation}</TableCell>
              <TableCell>{course.videoUrl} Videos</TableCell>
              <TableCell>{course.text} Texts</TableCell>
              <TableCell>{course.quize} Quizzes</TableCell>
              <TableCell className="flex space-x-2">
                {/*<Button size="sm" onClick={() => onEdit(course)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(course)}>
                  Delete
                </Button>*/}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesList;
