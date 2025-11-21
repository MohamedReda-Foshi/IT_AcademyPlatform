import { Router, Request, Response,NextFunction} from 'express';
import {courseModel,Icourse } from '../Model/course';
import mongoose from 'mongoose';
import { auth } from '../middlewares/auth';
import { role } from '../middlewares/roleauth';

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


router.get("/AllCourse", async (req: Request, res: Response):Promise<void> => {
    try{
        const courses = await courseModel
        .find()
        res.status(200)
        .json(courses);
    }catch (error) {
      
        console.error("Failed to fetch courses", error);
        res.status(500).json({ message: "Internal server error" });
      }

});

// all user courses
router.get("/course/CourseCard", async(req, res) => {
  try{
      const courses = await courseModel
      .find()
      .limit(1)
      .select('_id Namecourse category shortDescription imageUrl duration level rating price');
      res.status(200).send(courses);
  }catch (error) {
    
      console.error("Failed to fetch courses", error);
      res.status(500).json({ message: "Internal server error" });
    }

});




// this is a course page all user can see
router.get("/:id", 
  
  async (req: Request, res: Response):Promise<any> => {
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
            price,
            imageUrl,
            XpNumber,
            prerequisites,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            enrollments,
            videoUrl,
            text,
            quize,
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
            price,
            prerequisites,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            enrollments,
            videoUrl,
            text,
            quize,
            createdAt,
            updatedAt
          });
        } catch (err) {
          console.error('Failed to fetch course', err);
          res.status(500).json({ message: 'Internal server error' });
        }
      });



    router.get("/lesson/:id",

       async (req: Request, res: Response):Promise<any> => {

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Course ID is required" });

    }if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid course ID format' });
      }

    try{
        const Lesson = await courseModel
        .findById(id)
        .select('-__v'); // Exclude __v field from the response
        if(!Lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        
        const {
            _id,   
            Namecourse,
            videoUrl,
            text,
            quize,
            totalLessons,
            totalQuizzes,
            enrollments,
            XpNumber,
            duration
                        
            
          } = Lesson.toObject() as Icourse & { _id: mongoose.Types.ObjectId };
      
          res.status(200).json({
            id: _id,
            Namecourse,
            videoUrl: videoUrl ? videoUrl.map((v: any) => v.toString()) : [], // Convert ObjectId to string
            // Convert ObjectId to string for each field
            text: text ? text.map((t: any) => t.toString()) : [],
            quize: quize ? quize.map((q: any) => q.toString()) : [],
            totalLessons,
            totalQuizzes,
            enrollments,
            XpNumber ,
            duration

            
          });
        } catch (err) {
          console.error('Failed to fetch lesson', err);
          res.status(500).json({ message: 'Internal server error' });
        }
      });




// this is a course page all user can see
  









// Method 2: Get all lessons for a specific course




























 //auth,role("admin")
// add onlie admin can add a course
 router.post("/AddCourse",
    auth,
    role("admin"),
   async(req, res) => {
     try{
        const {
            Namecourse,
            DescriptionCourse,
            shortDescription,
            category,
            level,
            imageUrl,
            duration,
            modules,
            prerequisites,
            price,
            rating,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            isPublished,
            XpNumber,
            Instructor,
            InstructorInformation,
            videoUrl,
            text,
            quize,
            
        } = req.body;

         const course = new courseModel({
                         Namecourse,
            DescriptionCourse,
            shortDescription,
            category,
            level,
            imageUrl,
            duration,
            modules,
            prerequisites,
            price,
            rating,
            learningOutcomes,
            totalLessons,
            totalQuizzes,
            isPublished,
            XpNumber,
            Instructor,
            InstructorInformation,
            videoUrl,
            text,
            quize,
            
         });
         const data = await course.save();
         res.status(201).json(data);
     }catch(err){
         res.status(404).json(err);
     };
 });
// update course



/*
router.put("/UpdateCourse/:id", auth, role("admin"), async(req: Request, res: Response): Promise<void> =>{
  try{
    const id = req.params.id;
    const {Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse} = req.body;
    const updatedCourse = await courseModel.findByIdAndUpdate
    (id, {Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse},
      { new: true, runValidators: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
      }
    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error("Failed to update course", err);
    res.status(500).json({ message: "Internal server error" });
  }

});
*/




// delete course
/*
router.delete("/DeleteCourse/:id", auth, role("admin"), async (req, res) => {
  try { 
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    const deletedCourse = await courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Failed to delete course", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
*/

export default router;