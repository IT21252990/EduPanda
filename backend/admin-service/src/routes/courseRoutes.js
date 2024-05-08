const express = require("express");
const {
    getAllCourses,
    getNewCourses,
    getUpdatedCourses,
    approveCourse,
    rejectCourse
} = require("../controllers/courseControllers");

const router = express.Router();

// GET all courses
router.get("/", getAllCourses);
// GET new courses
router.get("/new", getNewCourses); 
//GET updated courses
router.get("/updated", getUpdatedCourses); 
//Patch approve a course
router.patch("/approve/:id", approveCourse); 
//Patch reject a course
router.patch("/reject/:id", rejectCourse); 


module.exports = router;