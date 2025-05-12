import { Router, Request, Response } from 'express';
import {courseModel,Icourse } from '../Model/course';
import mongoose from 'mongoose';

// this is a cart course 

const router =Router();

router.get("/CourseCard", async(req, res) => {
    try{
        const courses = await courseModel
        .find()
        .select('_id Namecourse category shortDescription imageUrl duration level rating');
        res.status(200).send(courses);
    }catch (error) {
      
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
      }

});


router.get("/CourseCardHomepage", async(req, res) => {
  try{
      const courses = await courseModel
      .find()
      .limit(1)
      .select('_id Namecourse category shortDescription imageUrl duration level rating');
      res.status(200).send(courses);
  }catch (error) {
    
      console.error("Failed to fetch courses", error);
      res.status(500).json({ message: "Internal server error" });
    }

});




// this is a course page
router.get("/:id", async (req: Request, res: Response):Promise<any> => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });

    }if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid course ID format' });
      }

    try{
        const Course = await courseModel
        .findById(id)
        .select('-__v'); // Exclude __v field from the response
        if(!Course) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        
        const {
            _id,
            Namecourse,
            DescriptionCourse,
            category,
            level,
            duration,
            rating,
            imageUrl,
            XpNumber,
            prerequisites,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            enrollments,
            createdAt,
            updatedAt
          } = Course.toObject() as Icourse & { _id: mongoose.Types.ObjectId };
      
          res.status(200).json({
            id: _id,
            Namecourse,
            DescriptionCourse,
            category,
            level,
            duration,
            rating,
            imageUrl,
            XpNumber,
            prerequisites,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            enrollments,
            createdAt,
            updatedAt
          });
        } catch (err) {
          console.error('Failed to fetch course', err);
          res.status(500).json({ message: 'Internal server error' });
        }
      });





















      

// add course
router.post("/AddCourse", async(req, res) => {
    try{

        const {Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse} = req.body;
        const course = new courseModel({
            Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse
        });
        const data = await course.save();
        res.status(201).json(data);
    }catch(err){
        res.status(404).json(err);
    };


});


export default router;