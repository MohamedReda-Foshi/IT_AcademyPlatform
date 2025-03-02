import express from 'express';
import {courseModel} from '../Model/course';


const router = express.Router();

router.get("/AllCourse", async(req, res) => {
    const courses = await courseModel.find();
    res.status(200).send(courses);
});

router.get("/CourseHomepage",async (req, res) => {
    const courses = await courseModel.find().limit(6);
    res.status(200).send(courses);
});

router.get("/AllCourse/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Course page! ${id}`);
});

router.post("/AddCourse", async(req, res) => {
    try{

        const {Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse} = req.body;
        const course = new courseModel({
            Namecourse, Descriptioncourse, Typecourse, levelcourse, imagecourse
        });
        const data = await course.save();
        res.status(201).send(data);
    }catch(err){
        res.status(404).send(err);
    };


});


export default router;