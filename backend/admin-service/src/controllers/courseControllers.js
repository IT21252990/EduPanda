const Course = require('../models/courseModel');


//@desc Retreive All courses
//@route /api/courses/
//@access public
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCourses,
};